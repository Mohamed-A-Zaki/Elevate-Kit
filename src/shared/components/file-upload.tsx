import { Button, Loader } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useEffect, useRef, useState } from "react";

interface UploadedFile {
  id: string;
  file: File;
  uploading: boolean;
  preview?: string;
}

const MAX_MEGA = 5;
const MAX_SIZE = MAX_MEGA * 1024 * 1024; // 5MB

export default function FileUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const openRef = useRef<() => void>(null);

  const uploadFile = async (file: File) => {
    const id = crypto.randomUUID();
    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;

    setFiles((prev) => [...prev, { id, file, uploading: true, preview }]);

    try {
      // Replace with your real API call
      await new Promise((resolve) =>
        setTimeout(resolve, 1800 + Math.random() * 800),
      );

      setFiles((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, uploading: false } : item,
        ),
      );
    } catch (err) {
      console.error(err);
      setFiles((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setError(null);
    acceptedFiles.forEach(uploadFile);
  };

  const handleReject = () => {
    setError("بعض الملفات غير مدعومة أو تجاوزت الحد المسموح به (2 ميجابايت)");
  };

  const removeFile = (id: string) => {
    const file = files.find((item) => item.id === id);
    if (file?.preview) URL.revokeObjectURL(file.preview);
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.preview) URL.revokeObjectURL(f.preview);
      });
    };
  }, []);

  return (
    <div dir="rtl" className="font-sans p-4">
      {/* Dropzone */}
      <Dropzone
        openRef={openRef}
        onDrop={handleDrop}
        onReject={handleReject}
        maxSize={MAX_SIZE}
        multiple
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf, "text/csv"]}
        classNames={{
          root: "!border-dashed !border-[1.5px] !border-gray-300 !rounded-xl !bg-gray-50 hover:!bg-gray-100 !transition-colors !cursor-pointer",
          inner: "!pointer-events-none",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center py-8 px-4">
          <p className="text-base font-medium text-gray-900 mb-1">
            رفع المرفقات
          </p>
          <p className="text-sm text-gray-500 leading-relaxed mb-5">
            الحد الأقصى لحجم الملف المسموح به هو {MAX_MEGA} ميجابايت، وتشمل
            الصيغ المدعومة
            <br />
            JPG و PNG و PDF و CSV
          </p>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openRef.current?.();
            }}
            className="bg-black-color! rounded-lg!"
          >
            تصفح الملفات
          </Button>
        </div>
      </Dropzone>

      {/* Validation error */}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-3 flex flex-col gap-2.5">
          {files.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 bg-white border border-border-color rounded-xl px-3.5 py-2.5"
            >
              {/* Left: thumbnail + info */}
              <div className="flex items-center gap-3 min-w-0">
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt={item.file.name}
                    className="w-12 h-12 rounded-lg object-cover border border-border-color shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-border-color flex items-center justify-center shrink-0 text-xl">
                    📄
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {(item.file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* Right: status + remove */}
              <div className="flex items-center gap-2.5 shrink-0">
                {item.uploading ? (
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
                  className="text-gray-400 cursor-pointer hover:text-gray-700 hover:bg-gray-100 p-1 rounded-md transition-colors"
                  aria-label="إزالة الملف"
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

          {/* Add more */}
          <button
            type="button"
            onClick={() => openRef.current?.()}
            className="mt-1 cursor-pointer self-start flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 border border-border-color hover:bg-gray-50 px-4 py-1.5 rounded-lg transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            إضافة ملفات أخرى
          </button>
        </div>
      )}
    </div>
  );
}
