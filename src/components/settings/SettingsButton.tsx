import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faGear,
  faCircleInfo,
  faPlay,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../forms/Button";

interface Props {
  onClick: () => void;
  type: string;
  disabled?: boolean;
  testId?: string;
}

export default function SettingsButton({ onClick, type, disabled }: Props) {
  let testId: string | undefined;
  let icon: IconDefinition | undefined;
  let title: string | undefined;
  const className =
    "rounded-full border border-black h-8 w-8 bg-gray-100 hover:bg-gray-200 hover:text-blue-600 disabled:bg-gray-100 disabled:text-gray-400 disabled:hover:text-gray-400";

  switch (type) {
    case "config":
      testId = "configuration-controls-button";
      icon = faGear;
      title = "Configurations";
      break;
    case "player":
      testId = "add-player-button";
      icon = faUser;
      title = "Add Players";
      break;
    case "info":
      testId = "info-button";
      icon = faCircleInfo;
      title = "Help";
      break;
    case "start":
      testId = "start-button";
      icon = faPlay;
      title = "Start";
      break;
    case "reset":
      testId = "reset-button";
      icon = faRotateLeft;
      title = "Reset"
      break;
    default:
    // do nothing
  }
  return (
    <Button
      onClick={onClick}
      icon={icon}
      testId={testId}
      className={className}
      title={title}
      disabled={disabled}
    />
  );
}
