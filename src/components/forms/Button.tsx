import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ButtonType } from "../../lib/enums";


interface Props {
  type?: string;
  onClick: () => void;
  disabled?: boolean | undefined;
  text?: string;
  className?: string;
  testId?: string;
  icon?: IconDefinition;
  title?: string;
}

export default function Button({
  type,
  onClick,
  disabled,
  text,
  className = '',
  testId = 'button',
  icon,
  title
}: Props) {
  let buttonType: ButtonType;
  
  switch (type) {
    case 'reset':
      buttonType = ButtonType.Reset;
      break;
    case 'submit':
      buttonType = ButtonType.Submit;
      break;
    default:
      buttonType = ButtonType.Button;
  }

  return (
    <button
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      data-testid={testId}
      title={title}
    >
      {text && text}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  );
}
