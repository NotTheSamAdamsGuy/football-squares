import { Square } from "../../lib/interfaces";

interface Props {
  square: Square;
  onClick?: () => void;
}

export default function SquareCard({ square, onClick }: Props) {
  return (
    <div
      className={`flex flex-col justify-center items-center bg-white rounded shadow hover:cursor-pointer ${square.highlights.join(
        " "
      )}`}
      key={`row${square.row}col${square.col}`}
      data-testid={`square-card-row${square.row}-col${square.col}`}
      onClick={onClick}
    >
      {square.player.initials}
    </div>
  );
}
