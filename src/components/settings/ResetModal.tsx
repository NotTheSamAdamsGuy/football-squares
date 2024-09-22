import BaseModal from "../modal/BaseModal";
import ModalButtons from "../modal/ModalButtons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function ResetModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Reset Configurations"
      id="configure"
      className="modal-w-md"
      testId="configurations-modal"
    >
      <form
        className="flex flex-col justify-evenly items-center" data-testid="reset-form"
        onSubmit={onSubmit}
      >
        <div>
          Are you sure you want to reset all configurations?
        </div>
        <ModalButtons
          primaryText="Yes"
          showSecondary={true}
          secondaryText="Cancel"
          onSecondaryClick={onClose}
        />
      </form>
    </BaseModal>
  );
}
