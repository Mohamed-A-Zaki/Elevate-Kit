import FileUpload, {
  createFileListValidator,
  type UploadedFile,
} from "@/shared/components/file-upload";
import { trans } from "@/shared/utils/trans";
import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

interface UploadResult {
  url: string;
  fileId: string;
}

async function uploadToServer(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  // const res = await fetch("/api/attachments", {
  //   method: "POST",
  //   body: formData,
  // });
  // if (!res.ok) throw new Error("upload failed");
  // return res.json();

  try {
    const { data } = await axios.post(
      "https://geoservices1.syadtech.com/gisapidevv2/admin/land/users/5544/sign",
      formData,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIxODkiLCJleHAiOjE3ODM3OTE5MTd9.foHXS0cU_HDx6ph59xBsCNB0zRb86JSZZP8CSquI0J4"}`,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error("upload failed");
  }
}

interface FormValues {
  attachments: UploadedFile<UploadResult>[];
}

export default function HomePage() {
  const form = useForm<FormValues>({
    initialValues: {
      attachments: [],
    },
    validate: {
      attachments: createFileListValidator({
        required: true,
      }),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(
      values.attachments.map((ele) => {
        return ele.file;
      }),
    );
  });

  return (
    <div>
      <div className="text-3xl my-5">{trans("common.homePage")}</div>

      <div>
        {trans("common.greeting", {
          firstName: "Mohamed",
          lastName: "Zaki",
        })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-5 border rounded-md mx-5"
      >
        <FileUpload<UploadResult>
          {...form.getInputProps("attachments")}
          uploadHandler={uploadToServer}
          accept={["image/png", "image/jpeg", "application/pdf", "text/csv"]}
          maxSizeMB={5}
          maxFiles={5}
        />

        <Button type="submit">إرسال</Button>
      </form>
    </div>
  );
}
