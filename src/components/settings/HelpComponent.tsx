import SettingsButton from "./SettingsButton";

export default function HelpComponent() {
  const onClick = () => {
    console.log('Info button clicked');
  };

  return (
    <SettingsButton type="info" onClick={onClick} />
  );
}