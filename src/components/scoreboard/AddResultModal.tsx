import BaseModal from "../modal/BaseModal";
import ModalButtons from "../modal/ModalButtons";

interface Props {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  homeTeamName: string;
  awayTeamName: string;
  period: string;
  homeTeamPoints: number;
  setHomeTeamPoints: (points: number) => void;
  awayTeamPoints: number;
  setAwayTeamPoints: (points: number) => void;
}

export default function AdddResultModal({
  isOpen,
  onSubmit,
  onClose,
  homeTeamName,
  awayTeamName,
  period,
  homeTeamPoints,
  setHomeTeamPoints,
  awayTeamPoints,
  setAwayTeamPoints,
}: Props) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Add ${period} Result`}
      id={period}
      testId="scoreboard-result-modal"
    >
      <div>
        <form>
          <div className="flex flex-row justify-evenly">
            <div className="flex flex-col justify-center items-center">
              <label htmlFor={`${period}HomeTeamScore`} className="flex">
                {homeTeamName}
              </label>
              <input
                type="number"
                id={`${period}HomeTeamScore`}
                className="flex border-2 w-12 text-center"
                value={`${homeTeamPoints}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setHomeTeamPoints(event.target.valueAsNumber);
                }}
                data-testid="home-team-points-input"
              ></input>
            </div>
            <div className="flex flex-col justify-center items-center">
              <label htmlFor={`${period}AwayTeamScore`} className="flex">
                {awayTeamName}
              </label>
              <input
                type="number"
                id={`${period}AwayTeamScore`}
                className="flex border-2 w-12 text-center"
                value={`${awayTeamPoints}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setAwayTeamPoints(event.target.valueAsNumber);
                }}
                data-testid="away-team-points-input"
              ></input>
            </div>
          </div>
        </form>
        <ModalButtons
          primaryText="Add"
          onPrimaryClick={onSubmit}
          showSecondary={true}
          secondaryText="Cancel"
          onSecondaryClick={onClose}
        />
      </div>
    </BaseModal>
  );
}
