import { SubmitHandler, useForm } from "react-hook-form";

import { AddPlayerFormData } from "../../lib/interfaces";
import BaseModal from "../modal/BaseModal";
import ModalButtons from "../modal/ModalButtons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<AddPlayerFormData>;
  displayName: string;
  showSuccessMessage: boolean;
}

export default function AddPlayerModal({
  isOpen,
  onClose,
  onSubmit,
  displayName,
  showSuccessMessage,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddPlayerFormData>();
  const successMessageStyle = showSuccessMessage ? "opacity-100" : "opacity-0";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Players"
      id="addPlayer"
    >
      <form onSubmit={handleSubmit(onSubmit)} data-testid="add-player-form">
        <label htmlFor="playerName">Name</label>
        <input
          {...register("playerName", { required: "Name is required" })}
          type="text"
          className="w-full h-8 border-2 p-2"
          id="playerName"
          autoComplete="off"
          data-testid="player-name-input"
        />
        {errors.playerName?.type === "required" && (
          <p role="alert" className="mt-3 h-6 text-red-500 text-center">
            {errors.playerName.message}
          </p>
        )}
        <div className={`mt-3 h-6 text-green-600 text-center`}>
          <span
            className={`${successMessageStyle} ease-in-out duration-150`}
            data-testid="success-message"
          >
            {displayName} added!
          </span>
        </div>
        <ModalButtons
          primaryText="Add Player"
          showSecondary={true}
          secondaryText="Close"
          onSecondaryClick={onClose}
        />
      </form>
    </BaseModal>
  );
}
