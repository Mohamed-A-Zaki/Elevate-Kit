import { Button, Group, Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useCreatePosition } from "../../positions/services/positions.mutations";
import { open_create_position_modal_atom } from "../atoms/open-atoms";

export default function CreatePositionModal() {
  const opened = open_create_position_modal_atom.useOpened();
  const { mutate, isPending } = useCreatePosition({
    invalidate: true,
  });

  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: isNotEmpty("هذا الحقل مطلوب"),
    },
  });

  function handleSubmit(values: typeof form.values) {
    mutate(values, {
      onSuccess() {
        open_create_position_modal_atom.close();
      },
      onError(error) {
        notifications.show({
          title: error.message,
          message: "هذا الاسم موجود بالفعل",
          color: "red",
        });
      },
    });
  }

  return (
    <Modal
      opened={opened}
      onClose={open_create_position_modal_atom.close}
      title="انشاء مسمي وظيفي"
      size={"lg"}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="الاسم"
          placeholder="الاسم"
          withAsterisk
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={isPending}>
            انشاء
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
