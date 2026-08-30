import { Button, Group, Loader, Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { useUpdatePosition } from "../../positions/services/positions.mutations";
import { useGetPosition } from "../../positions/services/positions.queries";
import { open_edit_position_modal_atom } from "../atoms/open-atoms";
import { selected_position_id_atom } from "../atoms/selected-position-id-atom";

export default function EditPositionModal() {
  const { id } = selected_position_id_atom.useValue();
  const { data, isPending: getPending } = useGetPosition(id);
  const opened = open_edit_position_modal_atom.useOpened();
  const { mutate, isPending: updatePending } = useUpdatePosition({
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

  function closeModal() {
    open_edit_position_modal_atom.close();
  }

  useEffect(() => {
    form.setValues({
      name: data?.name,
    });
  }, [data]);

  function handleSubmit(values: typeof form.values) {
    if (!id) {
      return;
    }

    mutate(
      { id, data: values },
      {
        onSuccess() {
          closeModal();
          notifications.show({
            message: "تم التعديل بنجاح",
          });
        },
        onError(error) {
          notifications.show({
            message: error.message,
            color: "red",
          });
        },
      },
    );
  }

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title="تعديل مسمي وظيفي"
      size={"lg"}
    >
      {getPending ? (
        <div className="flex h-25 items-center justify-center">
          <Loader />
        </div>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="الاسم"
            placeholder="الاسم"
            withAsterisk
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" loading={updatePending}>
              تعديل
            </Button>
          </Group>
        </form>
      )}
    </Modal>
  );
}
