import { SubmitHandler, useForm } from "react-hook-form";

import { AssignmentFormData, Player, Square } from "../../lib/interfaces";
import Select from "../forms/Select";
import BaseModal from "../modal/BaseModal";
import ModalButtons from "../modal/ModalButtons";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<AssignmentFormData>;
  players: Map<string, Player>;
  selectedSquare: Square;
}

export default function AssignmentModal({
  isOpen,
  onClose,
  onSubmit,
  players,
  selectedSquare
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormData>();

  const renderPlayerOptions = () => {
    const playerOptions: React.ReactElement<HTMLOptionElement>[] = [];

    playerOptions.push(
      <option key="" value="" className="text-center">
        None selected
      </option>
    );

    const sortedPlayers = new Map([...players.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name)));

    sortedPlayers.forEach((value, key) => {
      const option = (
        <option key={key} value={key} className="text-center">
          {value.name}
        </option>
      );
      playerOptions.push(option);
    });

    return playerOptions;
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Assign a player"
      id="configure"
      testId="assignment-modal"
    >
      <form
        className="flex flex-col items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select
          className="w-full"
          id="playerInitials"
          testId="players-select"
          label="Player"
          register={register}
          errors={errors}
        >
          {renderPlayerOptions()}
        </Select>
        <input type="hidden" id="row" value={selectedSquare.row} {...register("row")} />
        <input type="hidden" id="col" value={selectedSquare.col} {...register("col")} />
        <ModalButtons
          primaryText="Save"
          showSecondary={true}
          secondaryText="Cancel"
          onSecondaryClick={onClose}
        />
      </form>
    </BaseModal>
  );
}
