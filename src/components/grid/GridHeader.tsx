import HeaderSquare from "./HeaderNumber";
import { useBoardStateContext } from "../../context/BoardStateContext";
import { TeamBoardDetails } from "../../lib/interfaces";

interface Props {
  teamDetails: TeamBoardDetails;
  type: string;
  numbers: number[];
}

export default function GridHeader({
  teamDetails,
  type,
  numbers,
}: Props): JSX.Element {
  if (!teamDetails) throw new Error(`Invalid ${type} team details provided`);

  const { bgColor, numbersBgColor, homeBgImage, awayBgImage, homeBgStyle, awayBgStyle } =
    teamDetails.banner;
  const headerClass: string =
    type === "home"
      ? `flex-col col-span-10 row-span-2 rounded-tr-lg p-2 ${homeBgImage} ${homeBgStyle}`
      : `flex-row col-span-2 row-span-10 rounded-bl-lg ${awayBgImage} ${awayBgStyle}`;
  const nameRowClass: string = type === "home" ? "h-1/2" : "w-1/2 self-center";
  const nameClass: string =
    type === "home" ? "" : "-rotate-90 whitespace-nowrap";
  const numbersRowClass: string =
    type === "home" ? "flex flex-row h-1/2 gap-2" : "flex flex-col w-1/2 py-2";

  const { boardState } = useBoardStateContext();
  const { displayHeaderNumbers } = boardState;

  return (
    <div
      className={`flex text-white ${bgColor} bg-no-repeat ${headerClass}`}
      data-testid={`${type}-header`}
    >
      <div
        className={`flex flex-wrap justify-center items-center h-1/2 text-4xl text-white ${nameRowClass}`}
      >
        <div className={nameClass}></div>
      </div>
      <div className={numbersRowClass}>
        {numbers.map((number) => (
          <HeaderSquare
            type={type}
            number={number}
            displayNumber={displayHeaderNumbers}
            bgColor={numbersBgColor}
            key={`${type}${number}`}
          />
        ))}
      </div>
    </div>
  );
}
