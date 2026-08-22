import PageLoader from "@/shared/components/page-loader";
import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { useAllPositionsQuery } from "../../positions/services/positions.queries";
import {
  open_create_position_modal_atom,
  open_delete_position_modal_atom,
  open_edit_position_modal_atom,
} from "../atoms/open-atoms";
import { selected_position_id_atom } from "../atoms/selected-position-id-atom";
import ConfirmDeletePositionModal from "../components/confirm-delete-position-modal";
import CreatePositionModal from "../components/create-position-modal";
import EditPositionModal from "../components/edit-position-modal";

export default function PositionsPage() {
  const [activePage, setPage] = useState(1);

  const { data, isPending } = useAllPositionsQuery({
    pagesize: 12,
    page: activePage - 1,
  });

  const rows = data?.results.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td className="flex items-center gap-2">
        <ActionIcon
          onClick={() => {
            open_edit_position_modal_atom.open();
            selected_position_id_atom.update({
              id: +element.id,
            });
          }}
        >
          <FiEdit3 size={12} />
        </ActionIcon>
        <ActionIcon
          onClick={() => {
            open_delete_position_modal_atom.open();
            selected_position_id_atom.update({
              id: +element.id,
            });
          }}
        >
          <FaTrash size={12} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className="mt-5 flex justify-between">
        <Text size="xl">المسميات الوظيفية</Text>
        <Button onClick={open_create_position_modal_atom.open}>
          انشاء مسمي وظيفي
        </Button>
      </div>

      {isPending ? (
        <PageLoader />
      ) : (
        <>
          <div className="border-border-color my-5 rounded-lg border">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>الاسم</Table.Th>
                  <Table.Th>الاجراءات</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </div>

          {data && (
            <Group justify="flex-end">
              <Pagination
                value={activePage}
                onChange={setPage}
                total={data.totalPages}
              />
            </Group>
          )}
        </>
      )}

      <CreatePositionModal />
      <EditPositionModal />
      <ConfirmDeletePositionModal />
    </>
  );
}
