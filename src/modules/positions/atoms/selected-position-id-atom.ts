import { atom } from "@mongez/react-atom";

interface SelectedPositionId {
  id: number | null;
}

export const selected_position_id_atom = atom<SelectedPositionId>({
  key: "selected-position-id-atom",
  default: {
    id: null,
  },
});
