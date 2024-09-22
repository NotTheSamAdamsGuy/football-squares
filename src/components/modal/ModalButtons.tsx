import Button from "../forms/Button";

interface Props {
  primaryText: string;
  onPrimaryClick?: () => void;
  showSecondary?: boolean;
  secondaryText?: string;
  onSecondaryClick?: () => void;
}

export default function ModalButtons({
  primaryText,
  onPrimaryClick,
  showSecondary,
  secondaryText,
  onSecondaryClick,
}: Props) {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  return (
    <div className="flex w-full justify-end mt-6" data-testid="modal-buttons">
      {showSecondary ? (
        <Button
          onClick={onSecondaryClick!}
          text={secondaryText!}
          className="btn btn-secondary"
          testId="secondary-button"
        />
      ) : (
        ""
      )}
      <Button
        onClick={handlePrimaryClick}
        text={primaryText}
        className="ms-3 btn btn-primary"
        testId="primary-button"
        type="submit"
      />
    </div>
  );
}
