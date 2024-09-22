import { SubmitHandler, useForm } from "react-hook-form";

import { teams } from "../../data/teams";
import { ConfigurationFormData } from "../../lib/interfaces";
import Select from "../forms/Select";
import BaseModal from "../modal/BaseModal";
import ModalButtons from "../modal/ModalButtons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<ConfigurationFormData>;
}

export default function ConfigurationModal({
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigurationFormData>();

  const renderTeamOptions = () => {
    const teamOptions: React.ReactElement<HTMLOptionElement>[] = [];

    teamOptions.push(
      <option key="" value="" className="text-center">
        Select a team
      </option>
    );

    teams.forEach((value, key) => {
      const option = (
        <option key={key} value={key} className="text-center">
          {value.location} {value.name}
        </option>
      );
      teamOptions.push(option);
    });

    return teamOptions;
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Configurations"
      id="configure"
      className="modal-w-md"
      testId="configurations-modal"
    >
      <form
        className="flex flex-col justify-evenly items-center" data-testid="configuration-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Select
          id="homeTeam"
          testId="home-team-select"
          label="Home Team"
          register={register}
          errors={errors}
          required={true}
        >
          {renderTeamOptions()}
        </Select>
        <Select
          id="awayTeam"
          testId="away-team-select"
          label="Away Team"
          register={register}
          errors={errors}
          required={true}
        >
          {renderTeamOptions()}
        </Select>
        <Select
          id="numberOfPeriods"
          testId="scoring-preference-select"
          label="Scoring Preference"
          register={register}
          errors={errors}
          required={true}
        >
          <option value="" className="text-center">
            Select an option
          </option>
          <option value="4" className="text-center">
            Score after every quarter
          </option>
          <option value="2" className="text-center">
            Score after every half
          </option>
          <option value="1" className="text-center">
            Final score
          </option>
        </Select>
        <div className="flex flex-row mt-6">
          <label htmlFor="randomizeNumbers" className="me-3">
            Randomize Numbers
          </label>
          <input
            {...register("randomizeNumbers")}
            type="checkbox"
            id="randomizeNumbers"
            data-testid="randomize-numbers-checkbox"
          />
        </div>
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
