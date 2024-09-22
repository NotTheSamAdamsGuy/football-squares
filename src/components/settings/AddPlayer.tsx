import { useState } from "react";

import { JsonSerializer } from "json-safe-stringify";
import { SubmitHandler } from "react-hook-form";

import AddPlayerModal from "./AddPlayerModal";
import SettingsButton from "./SettingsButton";
import { useBoardStateContext } from "../../context/BoardStateContext";
import { GameStatus } from "../../lib/enums";
import { AddPlayerFormData, Player } from "../../lib/interfaces";
import { getInitialsFromName } from "../../lib/utils";

interface Props {
  players: Map<string, Player>;
  setPlayers: (players: Map<string, Player>) => void;
}

export default function AddPlayer({ players, setPlayers }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { boardState } = useBoardStateContext();

  const handleCloseModal = (): void => {
    setShowModal(false);
  };

  const handleSubmitClick: SubmitHandler<AddPlayerFormData> = (data) => {
    const { playerName } = data;

    try {
      addPlayer(playerName);
      setDisplayName(playerName);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 1750);
    } catch (error) {
      console.error(`Unable to add player: ${error}`);
    }
  };

  /**
   * Adds a new Player object to players map
   * @param name string
   */
  const addPlayer = (name: string): void => {
    const tempPlayers = new Map<string, Player>(
      JSON.parse(JSON.stringify([...players]))
    );

    // check if we already have a player with the given initials; if we do,
    // append a number to the end of the initials so we don't overwrite the original.
    let tempInitials = getInitialsFromName(name);
    let counter = 0;

    while (players.get(tempInitials) !== undefined) {
      counter = counter++;
      tempInitials = `${getInitialsFromName(name)}${counter}`;
    }

    const player = {
      name: name,
      initials: tempInitials,
    };

    tempPlayers.set(player.initials, player);
    setPlayers(tempPlayers);
    const serializer = new JsonSerializer();
    localStorage.setItem("players", serializer.stringify(tempPlayers));
  };

  return (
    <div data-testid="add-player">
      <SettingsButton
        type="player"
        onClick={() => setShowModal(true)}
        disabled={boardState.gameStatus === GameStatus.Started}
      />
      <AddPlayerModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitClick}
        displayName={displayName}
        showSuccessMessage={showSuccessMessage}
      />
    </div>
  );
}
