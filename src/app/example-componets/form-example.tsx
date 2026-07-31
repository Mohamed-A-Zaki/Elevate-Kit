import FileUpload, {
  createFileListValidator,
  type UploadedFile,
} from "@/shared/components/file-upload";
import { Button, TextInput } from "@mantine/core";
import { MS_WORD_MIME_TYPE, PDF_MIME_TYPE } from "@mantine/dropzone";
import { hasLength, isEmail, useForm } from "@mantine/form";

interface FormValues {
  name: string;
  job: string;
  email: string;
  attachments: UploadedFile[];
}

export default function FormExample() {
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      job: "",
      email: "",
      attachments: [],
    },
    validate: {
      name: hasLength(
        { min: 2, max: 10 },
        "Name must be between 2 and 10 characters",
      ),
      job: hasLength({ min: 0 }),
      email: isEmail("Invalid email"),
      attachments: createFileListValidator({
        required: true,
      }),
    },
    // validateInputOnBlur: true,
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="border-border-color flex flex-col gap-4 rounded-md border p-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Name"
          placeholder="Name"
          withAsterisk
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <TextInput
          label="Your job"
          placeholder="Your job"
          key={form.key("job")}
          {...form.getInputProps("job")}
        />
        <TextInput
          label="Your email"
          placeholder="Your email"
          withAsterisk
          mt="md"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
      </div>
      <FileUpload
        {...form.getInputProps("attachments")}
        accept={[...PDF_MIME_TYPE, ...MS_WORD_MIME_TYPE, "image/png"]}
        maxSizeMB={5}
        maxFiles={5}
      />

      <Button type="submit" className="ms-auto w-fit!">
        إرسال
      </Button>
    </form>
  );
}
