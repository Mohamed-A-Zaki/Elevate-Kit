import i18n from "@/shared/localization/i18n";
import { Button, Loader } from "@mantine/core";
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
import { trans } from "../utils/trans";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface UploadedFile<TResult = unknown> {
  id: string;
  file: File;
  uploading: boolean;
  /** per-file error, e.g. "too large", "type not allowed", upload failed... */
  error?: string;
  preview?: string;
  /** whatever your uploadHandler resolves with (server url, file id, etc.) */
  result?: TResult;
}

export interface FileUploadLabels {
  title: string;
  subtitle: (maxSizeMB: number, accepted: string) => string;
  browseButton: string;
  addMoreButton: string;
  removeAria: string;
  retryLabel: string;
  errorTooLarge: (maxSizeMB: number) => string;
  errorInvalidType: string;
  errorMaxFiles: (max: number) => string;
  errorRequired: string;
  errorUploadFailed: string;
  /** shown at the top when file(s) were added but all of them have errors — distinct from errorRequired */
  errorFilesInvalid: string;
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

function getFileUploadLabels(
  messages?: Partial<
    Pick<
      FileUploadLabels,
      "errorRequired" | "errorMaxFiles" | "errorFilesInvalid"
    >
  >,
): FileUploadLabels {
  return {
    title: i18n.t("fileUpload.title"),
    subtitle: (maxSizeMB, accepted) =>
      i18n.t("fileUpload.subtitle", { maxSizeMB, accepted }),
    browseButton: i18n.t("fileUpload.browseButton"),
    addMoreButton: i18n.t("fileUpload.addMoreButton"),
    removeAria: i18n.t("fileUpload.removeAria"),
    retryLabel: i18n.t("fileUpload.retryLabel"),
    errorTooLarge: (maxSizeMB) =>
      i18n.t("fileUpload.errorTooLarge", { maxSizeMB }),
    errorInvalidType: i18n.t("fileUpload.errorInvalidType"),
    errorMaxFiles: (max) => i18n.t("fileUpload.errorMaxFiles", { max }),
    errorRequired: i18n.t("fileUpload.errorRequired"),
    errorUploadFailed: i18n.t("fileUpload.errorUploadFailed"),
    errorFilesInvalid: i18n.t("fileUpload.errorFilesInvalid"),
    ...messages,
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

export interface FileUploadProps<TResult = unknown> {
  /** Field name, useful when wiring into plain `<form>` submits. */
  name?: string;

  /** Controlled list of files — pass together with `onChange` to drive from parent/RHF state. */
  value?: UploadedFile<TResult>[];
  /** Initial files when used uncontrolled (no `value` passed). */
  defaultValue?: UploadedFile<TResult>[];
  /** Fires on every internal change: add, remove, upload progress, upload result. */
  onChange?: (files: UploadedFile<TResult>[]) => void;
  /** Convenience callback — fires only with the successfully uploaded/added, error-free raw `File[]`. */
  onFilesChange?: (files: File[], allFiles: UploadedFile<TResult>[]) => void;

  /**
   * Async uploader that receives the raw `File`, resolve with
   * anything you want stored as `result` (server URL, file id, etc).
   */
  uploadHandler?: (file: File) => Promise<TResult>;
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
  /** Min number of successfully-added files required. Defaults to 1 when `required` is true. */
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
  /** Text direction — also selects the default label set (Arabic for rtl, English for ltr).
   * @default "rtl" */
  dir?: "rtl" | "ltr";
  /** Override any subset of the displayed strings (title, buttons, error messages...). */
  labels?: Partial<FileUploadLabels>;
  /** Extra classes applied to the root wrapper div. */
  className?: string;
}

export interface FileUploadRef<TResult = unknown> {
  /** Programmatically opens the native file picker. */
  openFileDialog: () => void;
  /** Removes all files and revokes their preview URLs. */
  clear: () => void;
  /** Returns the current file list (with status/error/result per file). */
  getFiles: () => UploadedFile<TResult>[];
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
    ? files.filter((f) => !f.error && !f.uploading)
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
    messages?: Partial<
      Pick<
        FileUploadLabels,
        "errorRequired" | "errorMaxFiles" | "errorFilesInvalid"
      >
    >;
    dir?: "rtl" | "ltr";
  } = {},
) {
  const { required, minFiles, maxFiles, messages } = options;
  const labels = getFileUploadLabels(messages);
  const requiredMin = minFiles ?? (required ? 1 : 0);

  return (value: UploadedFile[] | undefined | null): string | null => {
    const files = value ?? [];
    if (maxFiles && files.length > maxFiles)
      return labels.errorMaxFiles(maxFiles);

    if (requiredMin > 0 && files.length === 0) return labels.errorRequired;

    const withErrors = files.filter((f) => f.error);
    if (withErrors.length)
      return withErrors[0].error ?? labels.errorFilesInvalid;

    const settledCount = files.filter((f) => !f.error).length;
    if (requiredMin > 0 && settledCount < requiredMin)
      return labels.errorFilesInvalid;
    return null;
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function FileUploadInner<TResult = unknown>(
  {
    name,
    value,
    defaultValue,
    onChange,
    onFilesChange,
    uploadHandler,
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
    dir = "rtl",
    labels: labelsOverride,
    className = "",
  }: FileUploadProps<TResult>,
  ref: React.Ref<FileUploadRef<TResult>>,
) {
  const labels: FileUploadLabels = useMemo<FileUploadLabels>(
    () => ({
      title: trans("fileUpload.title"),
      subtitle: (maxSizeMB, accepted) =>
        trans("fileUpload.subtitle", { maxSizeMB, accepted }),
      browseButton: trans("fileUpload.browseButton"),
      addMoreButton: trans("fileUpload.addMoreButton"),
      removeAria: trans("fileUpload.removeAria"),
      retryLabel: trans("fileUpload.retryLabel"),
      errorTooLarge: (maxSizeMB) =>
        trans("fileUpload.errorTooLarge", { maxSizeMB }),
      errorInvalidType: trans("fileUpload.errorInvalidType"),
      errorMaxFiles: (max) => trans("fileUpload.errorMaxFiles", { max }),
      errorRequired: trans("fileUpload.errorRequired"),
      errorUploadFailed: trans("fileUpload.errorUploadFailed"),
      errorFilesInvalid: trans("fileUpload.errorFilesInvalid"),
      ...labelsOverride,
    }),
    [trans, labelsOverride],
  );

  const maxSize = maxSizeMB * 1024 * 1024;
  // const textClass = isDark ? "text-gray-100" : "text-gray-900";
  // const mutedTextClass = isDark ? "text-gray-400" : "text-gray-500";
  // const buttonBorderClass = isDark
  //   ? "border-gray-700 hover:bg-gray-800 hover:text-gray-100 text-gray-300"
  //   : "border-border-color hover:bg-gray-50 hover:text-gray-800 text-gray-500";
  const openRef = useRef<() => void>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const isControlled = value !== undefined;

  const [internalFiles, setInternalFiles] = useState<UploadedFile<TResult>[]>(
    defaultValue ?? [],
  );
  const files = isControlled
    ? (value as UploadedFile<TResult>[])
    : internalFiles;

  const [touched, setTouched] = useState(false);
  const [dropError, setDropError] = useState<string | null>(null);

  const acceptedLabel = useMemo(
    () => accept.map((m) => MIME_LABELS[m] ?? m).join(", "),
    [accept],
  );

  // Always holds the latest files, updated synchronously. Needed because two updateFiles
  // calls can fire back-to-back in the same tick (e.g. "add file" then "mark done" when
  // there's no real async delay) — before React has re-rendered with the first update.
  // Reading `value`/`internalFiles` directly in that second call would see stale data and
  // silently drop the first change (this caused files to vanish right after being added).
  const filesRef = useRef<UploadedFile<TResult>[]>(files);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  const updateFiles = useCallback(
    (updater: (prev: UploadedFile<TResult>[]) => UploadedFile<TResult>[]) => {
      const next = updater(filesRef.current);
      filesRef.current = next;
      if (!isControlled) setInternalFiles(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  // notify onFilesChange whenever the "settled" set of files changes
  useEffect(() => {
    const ready = files.filter((f) => !f.uploading && !f.error);
    onFilesChange?.(
      ready.map((f) => f.file),
      files,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const requiredMin = minFiles ?? (required ? 1 : 0);

  const validationError = useMemo(() => {
    if (!touched) return null;
    if (maxFiles && files.length > maxFiles) {
      return labels.errorMaxFiles(maxFiles);
    }
    // truly empty — nothing was ever added
    if (requiredMin > 0 && files.length === 0) {
      return labels.errorRequired;
    }
    const settledCount = files.filter((f) => !f.error).length;
    if (requiredMin > 0 && settledCount < requiredMin) {
      // a file WAS provided but it failed validation/upload — say so instead of
      // claiming the field is "required", which is confusing when a file is right there.
      return labels.errorFilesInvalid;
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files, touched, requiredMin, maxFiles]);

  const combinedError = externalError ?? dropError ?? validationError;
  const dropzoneRootClass = `!border-dashed !border-[1.5px] !rounded-xl !transition-colors ${
    disabled &&
    "!bg-gray-100 !border-gray-200 !cursor-not-allowed dark:!bg-gray-800 dark:!border-gray-700"
  } ${combinedError ? "!border-red-400" : ""}`;

  const runUpload = useCallback(
    async (id: string, file: File) => {
      if (!uploadHandler) {
        updateFiles((prev) =>
          prev.map((it) => (it.id === id ? { ...it, uploading: false } : it)),
        );
        return;
      }
      try {
        const result = await uploadHandler(file);
        // Create preview only after successful upload
        const preview =
          showThumbnails && file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined;
        updateFiles((prev) =>
          prev.map((it) =>
            it.id === id
              ? {
                  ...it,
                  uploading: false,
                  result,
                  error: undefined,
                  preview,
                  file: undefined as any,
                }
              : it,
          ),
        );
      } catch (err) {
        console.error(err);
        updateFiles((prev) =>
          prev.map((it) =>
            it.id === id
              ? {
                  ...it,
                  uploading: false,
                  error: labels.errorUploadFailed,
                  // Keep file on error so user can retry
                }
              : it,
          ),
        );
      }
    },
    [uploadHandler, updateFiles, labels, showThumbnails],
  );

  const addFile = useCallback(
    (file: File) => {
      const id = crypto.randomUUID();
      const customError = validate?.(file) ?? undefined;

      // If no uploadHandler, create preview immediately for images
      // If uploadHandler exists, preview will be created after successful upload
      const preview =
        !uploadHandler && showThumbnails && file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined;

      const entry: UploadedFile<TResult> = {
        id,
        file,
        uploading: !customError && !!uploadHandler,
        preview,
        error: customError ?? undefined,
      };

      updateFiles((prev) => {
        const base = multiple ? prev : [];
        return [...base, entry];
      });

      if (!customError && uploadHandler) runUpload(id, file);
    },
    [validate, showThumbnails, multiple, updateFiles, runUpload, uploadHandler],
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
    rejections.forEach(({ file, errors: fileErrors }) => {
      const isTooLarge = fileErrors.some((e) => e.code === "file-too-large");
      const isInvalidType = fileErrors.some(
        (e) => e.code === "file-invalid-type",
      );
      const message = isTooLarge
        ? labels.errorTooLarge(maxSizeMB)
        : isInvalidType
          ? labels.errorInvalidType
          : (fileErrors[0]?.message ?? labels.errorUploadFailed);

      updateFiles((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          file,
          uploading: false,
          error: message,
        },
      ]);
    });
  };

  const removeFile = (id: string) => {
    setTouched(true);
    const target = files.find((it) => it.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    updateFiles((prev) => prev.filter((it) => it.id !== id));
  };

  const retryFile = (id: string) => {
    const target = files.find((it) => it.id === id);
    if (!target || !target.file) return;
    updateFiles((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, uploading: true, error: undefined } : it,
      ),
    );
    runUpload(id, target.file);
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep a real file input's FileList in sync so a plain (non-AJAX) <form> submit
  // carries the raw files too — only relevant when syncNativeInput is enabled
  useEffect(() => {
    if (!syncNativeInput || !nativeInputRef.current) return;
    try {
      const dataTransfer = new DataTransfer();
      files
        .filter((f) => !f.error && f.file)
        .forEach((f) => dataTransfer.items.add(f.file));
      nativeInputRef.current.files = dataTransfer.files;
    } catch (err) {
      console.error("FileUpload: failed to sync native file input", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      const settledCount = files.filter((f) => !f.error).length;
      if (requiredMin > 0 && settledCount < requiredMin) return false;
      if (maxFiles && files.length > maxFiles) return false;
      if (files.some((f) => f.error)) return false;
      return true;
    },
    getFormData: (fieldName = name ?? "files") =>
      filesToFormData(files, { fieldName }),
  }));

  return (
    <div dir={dir} className={`font-sans p-4 ${className}`}>
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
        disabled={disabled || (!multiple && files.some((f) => !f.error))}
        accept={accept}
        classNames={{
          root: dropzoneRootClass,
          inner: "!pointer-events-none",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center py-8 px-4">
          <p className={`text-base font-medium mb-1`}>{labels.title}</p>
          <p className={`text-sm leading-relaxed mb-5`}>
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
        <p className="text-xs text-red-500 mt-2">{combinedError}</p>
      )}

      {files.length > 0 && (
        <div className="mt-3 flex flex-col gap-2.5">
          {files.map((item) => (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-3 border rounded-xl px-3.5 py-2.5 ${
                item.error ? "border-red-300" : "border-border-color"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.file?.name || trans("fileUpload.uploadedFile")}
                    className="w-12 h-12 rounded-lg object-cover border border-border-color shrink-0"
                  />
                ) : (
                  <div
                    className={`w-12 h-12 rounded-lg border border-border-color flex items-center justify-center shrink-0`}
                  >
                    {getFileIcon(item.file?.type)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate`}>
                    {item.file?.name || trans("fileUpload.uploadedFile")}
                  </p>
                  {item.file && (
                    <p className={`text-xs mt-0.5`}>
                      {trans("fileUpload.sizeInKb", {
                        size: (item.file.size / 1024).toFixed(1),
                      })}
                    </p>
                  )}
                  {item.error && (
                    <p className="text-xs text-red-500 mt-0.5">{item.error}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {item.error ? (
                  <button
                    type="button"
                    onClick={() => retryFile(item.id)}
                    className="text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    {labels.retryLabel}
                  </button>
                ) : item.uploading ? (
                  <Loader size="sm" className="text-primary-600" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
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
                  onClick={() => removeFile(item.id)}
                  disabled={disabled}
                  className={`cursor-pointer p-1 rounded-md transition-colors`}
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
          ))}

          {multiple && (!maxFiles || files.length < maxFiles) && (
            <button
              type="button"
              onClick={() => openRef.current?.()}
              disabled={disabled}
              className={`mt-1 cursor-pointer self-start flex items-center gap-1.5 text-sm border border-border-color px-4 py-1.5 rounded-lg transition-colors`}
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

const FileUpload = forwardRef(FileUploadInner) as <TResult = unknown>(
  props: FileUploadProps<TResult> & { ref?: React.Ref<FileUploadRef<TResult>> },
) => ReturnType<typeof FileUploadInner>;

export default FileUpload;
