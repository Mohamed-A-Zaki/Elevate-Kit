import { Button } from "@mantine/core";
import { Dropzone, type FileRejection, MIME_TYPES } from "@mantine/dropzone";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaFileArchive } from "react-icons/fa";
import {
  FaFileCode,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaFilm,
  FaMusic,
  FaRegFile,
} from "react-icons/fa6";
import { trans } from "../../packages/smart-localization";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UploadedFile {
  id: string;
  file: File;
  /** per-file error, e.g. "too large", "type not allowed"... */
  error?: string;
  preview?: string;
}

type FileStatus = "error" | "done";

function getFileStatus(item: UploadedFile): FileStatus {
  if (item.error) return "error";
  return "done";
}

export interface FileUploadLabels {
  title: string;
  subtitle: (maxSizeMB: number, accepted: string) => string;
  browseButton: string;
  addMoreButton: string;
  removeAria: string;
  errorTooLarge: (maxSizeMB: number) => string;
  errorInvalidType: string;
  errorMaxFiles: (max: number) => string;
  errorRequired: string;
  /** shown when file(s) were added but all of them have errors — distinct from errorRequired */
  errorFilesInvalid: string;
  uploadedFile: string;
  sizeInKb: (size: string) => string;
}

const MIME_LABELS: Record<string, string> = {
  [MIME_TYPES.png]: "PNG",
  [MIME_TYPES.jpeg]: "JPG",
  [MIME_TYPES.pdf]: "PDF",
  [MIME_TYPES.svg]: "SVG",
  [MIME_TYPES.webp]: "WEBP",
  [MIME_TYPES.gif]: "GIF",
  [MIME_TYPES.doc]: "DOC",
  [MIME_TYPES.docx]: "DOCX",
  [MIME_TYPES.xls]: "XLS",
  [MIME_TYPES.xlsx]: "XLSX",
  [MIME_TYPES.ppt]: "PPT",
  [MIME_TYPES.pptx]: "PPTX",
  "text/csv": "CSV",
  "text/plain": "TXT",
  "application/json": "JSON",
  "application/zip": "ZIP",
};

/** Single source of truth for labels — used by both the component and the standalone validator. */
function buildLabels(overrides?: Partial<FileUploadLabels>): FileUploadLabels {
  return {
    title: trans("fileUpload.title"),
    subtitle: (maxSizeMB, accepted) =>
      trans("fileUpload.subtitle", { maxSizeMB, accepted }),
    browseButton: trans("fileUpload.browseButton"),
    addMoreButton: trans("fileUpload.addMoreButton"),
    removeAria: trans("fileUpload.removeAria"),
    errorTooLarge: (maxSizeMB) =>
      trans("fileUpload.errorTooLarge", { maxSizeMB }),
    errorInvalidType: trans("fileUpload.errorInvalidType"),
    errorMaxFiles: (max) => trans("fileUpload.errorMaxFiles", { max }),
    errorRequired: trans("fileUpload.errorRequired"),
    errorFilesInvalid: trans("fileUpload.errorFilesInvalid"),
    uploadedFile: trans("fileUpload.uploadedFile"),
    sizeInKb: (size) => trans("fileUpload.sizeInKb", { size }),
    ...overrides,
  };
}

function getFileIcon(mimeType: string | undefined): React.ReactNode {
  if (!mimeType) return <FaRegFile size={24} />;

  if (mimeType.startsWith("image/")) return <FaFileImage size={24} />;
  if (mimeType === MIME_TYPES.pdf) return <FaFilePdf size={24} />;
  if (mimeType === MIME_TYPES.doc || mimeType === MIME_TYPES.docx)
    return <FaFileWord size={24} />;
  if (mimeType === MIME_TYPES.xls || mimeType === MIME_TYPES.xlsx)
    return <FaFileExcel size={24} />;
  if (mimeType === MIME_TYPES.ppt || mimeType === MIME_TYPES.pptx)
    return <FaFilePowerpoint size={24} />;
  if (
    mimeType === "application/zip" ||
    mimeType === "application/x-zip-compressed"
  )
    return <FaFileArchive size={24} />;
  if (mimeType.startsWith("video/")) return <FaFilm size={24} />;
  if (mimeType.startsWith("audio/")) return <FaMusic size={24} />;
  if (
    mimeType.startsWith("text/") ||
    mimeType === "application/json" ||
    mimeType === "text/csv"
  )
    return <FaFileCode size={24} />;

  return <FaRegFile size={24} />;
}

/**
 * All of Mantine's known MIME_TYPES are offered as autocomplete suggestions,
 * plus a handful of common extras. `string & {}` is a TS trick that keeps
 * the literal suggestions showing up in your editor while still allowing
 * any arbitrary mime string ("application/x-my-format") to be passed.
 */
export type AcceptedMimeType =
  | (typeof MIME_TYPES)[keyof typeof MIME_TYPES]
  | "text/csv"
  | "text/plain"
  | "application/json"
  | "application/zip"
  | (string & {});

export interface FileUploadProps {
  /** Field name, useful when wiring into plain `<form>` submits. */
  name?: string;

  /** Controlled list of files — pass together with `onChange` to drive from parent/RHF state. */
  value?: UploadedFile[];
  /** Initial files when used uncontrolled (no `value` passed). */
  defaultValue?: UploadedFile[];
  /** Fires on every internal change: add, remove. */
  onChange?: (files: UploadedFile[]) => void;
  /** Convenience callback — fires only with the current, error-free raw `File[]`. */
  onFilesChange?: (files: File[], allFiles: UploadedFile[]) => void;

  /** Custom sync validation per file. Return an error string to reject the file, or null/undefined to accept it. */
  validate?: (file: File) => string | null | undefined;

  /**
   * Keep a real (visually hidden) `<input type="file">` in sync with the current files via
   * `DataTransfer`, so a plain native (non-JS/AJAX) `<form>` submit carries the files too under
   * `name`.
   * @default false
   */
  syncNativeInput?: boolean;

  /**
   * Allowed mime types. Autocompletes Mantine's `MIME_TYPES` (e.g. `MIME_TYPES.png`) plus common extras.
   * @default [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf, "text/csv"]
   */
  accept?: AcceptedMimeType[];
  /** Max size per file, in megabytes.
   * @default 5 */
  maxSizeMB?: number;
  /** Max total number of files allowed. Omit for unlimited. */
  maxFiles?: number;
  /** Min number of valid files required. Defaults to 1 when `required` is true. */
  minFiles?: number;
  /** Allow selecting/dropping more than one file at a time.
   * @default true */
  multiple?: boolean;
  /** Marks the field as required (shorthand for `minFiles={1}`).
   * @default false */
  required?: boolean;
  /** Disables the dropzone and all interactions.
   * @default false */
  disabled?: boolean;

  /** External error (e.g. `fieldState.error?.message` from react-hook-form), merged with internal validation. */
  error?: string;

  /** Show image thumbnails for image files.
   * @default true */
  showThumbnails?: boolean;
  /** Override any subset of the displayed strings (title, buttons, error messages...). */
  labels?: Partial<FileUploadLabels>;
  /** Extra classes applied to the root wrapper div. */
  className?: string;
}

export interface FileUploadRef {
  /** Programmatically opens the native file picker. */
  openFileDialog: () => void;
  /** Removes all files and revokes their preview URLs. */
  clear: () => void;
  /** Returns the current file list (with status/error per file). */
  getFiles: () => UploadedFile[];
  /** Runs required/minFiles/maxFiles/per-file-error checks, returns true if valid. Also marks the field as touched so errors render. */
  validate: () => boolean;
  /**
   * Builds a `FormData` from the current valid raw files.
   * Merge it into your own FormData or send it as-is.
   */
  getFormData: (fieldName?: string) => FormData;
}

/**
 * Appends raw `File` objects from an `UploadedFile[]` list onto a `FormData`.
 *
 * @example
 * const formData = filesToFormData(fileUploadRef.current.getFiles(), { fieldName: "attachments" });
 * formData.append("title", values.title);
 * await fetch("/api/submit", { method: "POST", body: formData });
 */
export function filesToFormData(
  files: UploadedFile[],
  options: {
    formData?: FormData;
    fieldName?: string;
    onlyValid?: boolean;
  } = {},
): FormData {
  const {
    formData = new FormData(),
    fieldName = "files",
    onlyValid = true,
  } = options;
  const list = onlyValid
    ? files.filter((f) => getFileStatus(f) === "done")
    : files;
  list.forEach((f) => {
    if (f.file) {
      formData.append(`${fieldName}[]`, f.file, f.file.name);
    }
  });
  return formData;
}

/**
 * Builds a validator function you can drop straight into `@mantine/form`'s
 * `validate: { fieldName: ... }` object (or any validate-on-value function).
 *
 * @example
 * const form = useForm({
 *   initialValues: { attachments: [] as UploadedFile[] },
 *   validate: {
 *     attachments: createFileListValidator({ required: true, maxFiles: 5 }),
 *   },
 * });
 */
export function createFileListValidator(
  options: {
    required?: boolean;
    minFiles?: number;
    maxFiles?: number;
    messages?: Partial<FileUploadLabels>;
  } = {},
) {
  const { required, minFiles, maxFiles, messages } = options;
  const labels = buildLabels(messages);
  const requiredMin = minFiles ?? (required ? 1 : 0);

  return (value: UploadedFile[] | undefined | null): string | null => {
    const files = value ?? [];
    if (maxFiles && files.length > maxFiles)
      return labels.errorMaxFiles(maxFiles);

    if (requiredMin > 0 && files.length === 0) return labels.errorRequired;

    const firstErrored = files.find((f) => f.error);
    if (firstErrored) return firstErrored.error ?? labels.errorFilesInvalid;

    const settledCount = files.filter(
      (f) => getFileStatus(f) === "done",
    ).length;
    if (requiredMin > 0 && settledCount < requiredMin)
      return labels.errorFilesInvalid;
    return null;
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function FileUploadInner(
  {
    name,
    value,
    defaultValue,
    onChange,
    onFilesChange,
    validate,
    syncNativeInput = false,
    accept = [MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf, "text/csv"],
    maxSizeMB = 5,
    maxFiles,
    minFiles,
    multiple = true,
    required = false,
    disabled = false,
    error: externalError,
    showThumbnails = true,
    labels: labelsOverride,
    className = "",
  }: FileUploadProps,
  ref: React.Ref<FileUploadRef>,
) {
  const labels = useMemo(() => buildLabels(labelsOverride), [labelsOverride]);

  const maxSize = maxSizeMB * 1024 * 1024;
  const requiredMin = minFiles ?? (required ? 1 : 0);

  const openRef = useRef<() => void>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;

  const [internalFiles, setInternalFiles] = useState<UploadedFile[]>(
    defaultValue ?? [],
  );
  const files = isControlled ? (value as UploadedFile[]) : internalFiles;

  const [touched, setTouched] = useState(false);
  const [dropError, setDropError] = useState<string | null>(null);

  const acceptedLabel = useMemo(
    () => accept.map((m) => MIME_LABELS[m] ?? m).join(", "),
    [accept],
  );

  // Always holds the latest files, updated synchronously. Needed because two updateFiles
  // calls can fire back-to-back in the same tick — before React has re-rendered with the
  // first update. Reading `value`/`internalFiles` directly in that second call would see
  // stale data and silently drop the first change.
  const filesRef = useRef<UploadedFile[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const updateFiles = useCallback(
    (updater: (prev: UploadedFile[]) => UploadedFile[]) => {
      const next = updater(filesRef.current);
      filesRef.current = next;
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  // notify onFilesChange whenever the "settled" set of files changes
  useEffect(() => {
    const ready = files.filter((f) => getFileStatus(f) === "done");
    onFilesChange?.(
      ready.map((f) => f.file),
      files,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const validationError = useMemo(() => {
    if (!touched) return null;
    if (maxFiles && files.length > maxFiles)
      return labels.errorMaxFiles(maxFiles);
    // truly empty — nothing was ever added
    if (requiredMin > 0 && files.length === 0) return labels.errorRequired;
    const settledCount = files.filter(
      (f) => getFileStatus(f) === "done",
    ).length;
    if (requiredMin > 0 && settledCount < requiredMin) {
      // a file WAS provided but it failed validation — say so instead of claiming the
      // field is "required", which is confusing when a file is right there.
      return labels.errorFilesInvalid;
    }
    return null;
  }, [files, touched, requiredMin, maxFiles, labels]);

  const combinedError = externalError ?? dropError ?? validationError;
  const dropzoneRootClass = [
    "!border-dashed !border-[1.5px] !rounded-xl !transition-colors",
    disabled &&
      "!bg-gray-100 !border-gray-200 !cursor-not-allowed dark:!bg-gray-800 dark:!border-gray-700",
    combinedError && "!border-red-400",
  ]
    .filter(Boolean)
    .join(" ");

  const addFile = useCallback(
    (file: File) => {
      const id = crypto.randomUUID();
      const customError = validate?.(file) ?? undefined;

      const preview =
        showThumbnails && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;

      const entry: UploadedFile = {
        id,
        file,
        preview,
        error: customError ?? undefined,
      };

      updateFiles((prev) => (multiple ? [...prev, entry] : [entry]));
    },
    [validate, showThumbnails, multiple, updateFiles],
  );

  const handleDrop = (accepted: File[]) => {
    setTouched(true);
    setDropError(null);

    let incoming = accepted;
    if (maxFiles) {
      const existingSettled = files.filter((f) => !f.error).length;
      const room = Math.max(maxFiles - existingSettled, 0);
      if (incoming.length > room) {
        setDropError(labels.errorMaxFiles(maxFiles));
        incoming = incoming.slice(0, room);
      }
    }
    incoming.forEach(addFile);
  };

  const handleReject = (rejections: FileRejection[]) => {
    setTouched(true);
    updateFiles((prev) => [
      ...prev,
      ...rejections.map(({ file, errors: fileErrors }) => {
        const isTooLarge = fileErrors.some((e) => e.code === "file-too-large");
        const isInvalidType = fileErrors.some(
          (e) => e.code === "file-invalid-type",
        );
        const message = isTooLarge
          ? labels.errorTooLarge(maxSizeMB)
          : isInvalidType
            ? labels.errorInvalidType
            : (fileErrors[0]?.message ?? labels.errorInvalidType);

        return {
          id: crypto.randomUUID(),
          file,
          error: message,
        } as UploadedFile;
      }),
    ]);
  };

  const removeFile = (id: string) => {
    setTouched(true);
    const target = files.find((it) => it.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    updateFiles((prev) => prev.filter((it) => it.id !== id));
  };

  // Revoke any remaining preview URLs on unmount only (ref keeps this callback stable
  // and avoids re-registering the cleanup effect on every files change).
  useEffect(() => {
    return () => {
      filesRef.current.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  // Keep a real file input's FileList in sync so a plain (non-AJAX) <form> submit
  // carries the raw files too — only relevant when syncNativeInput is enabled.
  useEffect(() => {
    if (!syncNativeInput || !nativeInputRef.current) return;
    try {
      const dataTransfer = new DataTransfer();
      files
        .filter((f) => getFileStatus(f) === "done" && f.file)
        .forEach((f) => dataTransfer.items.add(f.file));
      nativeInputRef.current.files = dataTransfer.files;
    } catch (err) {
      console.error("FileUpload: failed to sync native file input", err);
    }
  }, [files, syncNativeInput]);

  useImperativeHandle(ref, () => ({
    openFileDialog: () => openRef.current?.(),
    clear: () => {
      files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
      updateFiles(() => []);
    },
    getFiles: () => files,
    validate: () => {
      setTouched(true);
      if (maxFiles && files.length > maxFiles) return false;
      if (files.some((f) => f.error)) return false;
      const settledCount = files.filter(
        (f) => getFileStatus(f) === "done",
      ).length;
      if (requiredMin > 0 && settledCount < requiredMin) return false;
      return true;
    },
    getFormData: (fieldName = name ?? "files") =>
      filesToFormData(files, { fieldName }),
  }));

  const canAddMore = multiple && (!maxFiles || files.length < maxFiles);
  const dropzoneDisabled =
    disabled || (!multiple && files.some((f) => !f.error));

  return (
    <div className={`p-4 font-sans ${className}`}>
      {syncNativeInput ? (
        <input
          ref={nativeInputRef}
          type="file"
          name={name}
          multiple={multiple}
          hidden
        />
      ) : (
        <input
          type="hidden"
          name={name}
          value={files.length ? "has-files" : ""}
          readOnly
        />
      )}

      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={maxSize}
        multiple={multiple}
        disabled={dropzoneDisabled}
        accept={accept}
        classNames={{ root: dropzoneRootClass, inner: "!pointer-events-none" }}
      >
        <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
          <p className="mb-1 text-base font-medium">{labels.title}</p>
          <p className="mb-5 text-sm leading-relaxed">
            {labels.subtitle(maxSizeMB, acceptedLabel)}
          </p>
          <Button
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              openRef.current?.();
            }}
          >
            {labels.browseButton}
          </Button>
        </div>
      </Dropzone>

      {combinedError && (
        <p className="mt-2 text-xs text-red-500">{combinedError}</p>
      )}

      {files.length > 0 && (
        <div className="mt-3 flex flex-col gap-2.5">
          {files.map((item) => (
            <FileRow
              key={item.id}
              item={item}
              labels={labels}
              disabled={disabled}
              onRemove={() => removeFile(item.id)}
            />
          ))}

          {canAddMore && (
            <button
              type="button"
              onClick={() => openRef.current?.()}
              disabled={disabled}
              className="border-border-color mt-1 flex cursor-pointer items-center gap-1.5 self-start rounded-lg border px-4 py-1.5 text-sm transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v12M1 7h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              {labels.addMoreButton}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Row subcomponent                                                   */
/* ------------------------------------------------------------------ */

interface FileRowProps {
  item: UploadedFile;
  labels: FileUploadLabels;
  disabled: boolean;
  onRemove: () => void;
}

function FileRow({ item, labels, disabled, onRemove }: FileRowProps) {
  const status = getFileStatus(item);

  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 ${
        status === "error" ? "border-red-300" : "border-border-color"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {item.preview ? (
          <img
            src={item.preview}
            alt={item.file?.name || labels.uploadedFile}
            className="border-border-color h-12 w-12 shrink-0 rounded-lg border object-cover"
          />
        ) : (
          <div className="border-border-color flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border">
            {getFileIcon(item.file?.type)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {item.file?.name || labels.uploadedFile}
          </p>
          {item.file && (
            <p className="mt-0.5 text-xs">
              {labels.sizeInKb((item.file.size / 1024).toFixed(1))}
            </p>
          )}
          {item.error && (
            <p className="mt-0.5 text-xs text-red-500">{item.error}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        {status === "done" && (
          <div className="bg-primary-600 flex h-5 w-5 items-center justify-center rounded-full">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="cursor-pointer rounded-md p-1 transition-colors"
          aria-label={labels.removeAria}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 2l10 10M12 2L2 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

const FileUpload = forwardRef(FileUploadInner) as (
  props: FileUploadProps & { ref?: React.Ref<FileUploadRef> },
) => ReturnType<typeof FileUploadInner>;

export default FileUpload;
