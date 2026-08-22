import { Button, Group, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDeletePositionMutation } from "../../positions/services/positions.mutations";
import { open_delete_position_modal_atom } from "../atoms/open-atoms";
import { selected_position_id_atom } from "../atoms/selected-position-id-atom";

export default function ConfirmDeletePositionModal() {
  const { id } = selected_position_id_atom.useValue();
  const opened = open_delete_position_modal_atom.useOpened();
  const { mutate, isPending } = useDeletePositionMutation();

  function closeModal() {
    open_delete_position_modal_atom.close();
  }

  function handleDelete() {
    if (id) {
      mutate(id, {
        onSuccess() {
          closeModal();
          notifications.show({
            message: "تم الحذف بنجاح",
          });
        },
        onError(error) {
          notifications.show({
            message: error.message,
            color: "red",
          });
        },
      });
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      title="حذف مسمي وظيفي"
      size={"lg"}
    >
      <Group justify="flex-end" mt="md">
        <Button loading={isPending} onClick={handleDelete}>
          حذف
        </Button>
      </Group>
    </Modal>
  );
}
