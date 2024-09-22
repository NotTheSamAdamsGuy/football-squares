import { useState } from "react";

import { SubmitHandler } from "react-hook-form";

import AssignmentModal from "./AssignmentModal";
import SquareCard from "./SquareCard";
import { AssignmentFormData, Player, Square } from "../../lib/interfaces";

interface Props {
  squares: Square[][];
  setSquares: (squares: Square[][]) => void;
  players: Map<string, Player>;
}

export default function SquaresGrid({ squares, setSquares, players }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square>({
    player: { name: "", initials: "" },
    row: -1,
    col: -1,
    highlights: [],
  });

  const handleSquareClick = (square: Square) => {
    setSelectedSquare(square);
    setShowModal(true);
  };

  const renderSquares = () => {
    const squareEls: JSX.Element[] = [];

    squares.forEach((row: Square[], rowIndex: number) => {
      row.forEach((square: Square, colIndex: number) => {
        squareEls.push(
          <SquareCard
            square={square}
            key={`row${rowIndex}col${colIndex}`}
            onClick={() => handleSquareClick(square)}
          />
        );
      });
    });

    return squareEls;
  };

  const updateSquares: SubmitHandler<AssignmentFormData> = (data) => {
    const { playerInitials } = data;
    const tempSquares: Square[][] = [...squares];
    const tempSquare = squares[selectedSquare.row][selectedSquare.col];

    if (playerInitials) {
      tempSquare.player = {
        name: players.get(playerInitials)!.name,
        initials: playerInitials!,
      };
    } else {
      tempSquare.player = {
        name: "",
        initials: ""
      };
    }

    tempSquares[selectedSquare.row][selectedSquare.col] = tempSquare;

    setSquares(tempSquares);
    localStorage.setItem("squares", JSON.stringify(tempSquares));
    setShowModal(false);
  };

  return (
    <>
      <div
        className="col-span-10 row-span-10 bg-slate-200 rounded-br-lg grid grid-cols-10 grid-rows-10 p-2 gap-2"
        data-testid="squares-grid"
      >
        {renderSquares()}
      </div>
      <AssignmentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={updateSquares}
        players={players}
        selectedSquare={selectedSquare}
      />
    </>
  );
}
