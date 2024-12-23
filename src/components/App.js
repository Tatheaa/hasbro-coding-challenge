import "../App.css";
import React, { useCallback, useState } from "react";
import TalentTreePath from "./TalentTreePath";
import PointTotal from "./PointTotal";
import { getRuneValuesBeforeOrAfter } from "../helper";

const PATH_1_RUNE_IDS = [0, 1, 2, 3];
const PATH_2_RUNE_IDS = [4, 5, 6, 7];
const MAX_RUNES_ALLOWED = 6;

const App = () => {
  const [runeState, setRuneState] = useState(
    [...PATH_1_RUNE_IDS, ...PATH_2_RUNE_IDS].reduce((defaultRuneState, id) => {
      defaultRuneState[id] = false;
      return defaultRuneState;
    }, {})
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleRuneClick = useCallback(
    (id, isRightClick = false) => {
      // Clear any existing error messages
      setErrorMessage("");

      if (!isRightClick && runeState[id]) return; // Left click, but Rune is already active
      if (isRightClick && !runeState[id]) return; // Right click, but Rune is already inactive

      //Right click - handle deactivation
      if (isRightClick) {
        // Check if there are any active runes after the selected one
        if (
          getRuneValuesBeforeOrAfter(
            [PATH_1_RUNE_IDS, PATH_2_RUNE_IDS],
            id,
            false
          ).some((rid) => runeState[rid])
        ) {
          setErrorMessage(
            "Cannot deactivate a rune that has active runes after it"
          );
          return;
        }
        setRuneState((prev) => ({ ...prev, [id]: false }));
        return;
      }

      // Left click - handle activation
      //First, check if user already selected max runes
      if (
        Object.values(runeState).filter(Boolean).length === MAX_RUNES_ALLOWED
      ) {
        setErrorMessage("You can only select up to 6 runes");
        return;
      }

      //Check if there are any inactive runes before the selected one
      if (
        getRuneValuesBeforeOrAfter(
          [PATH_1_RUNE_IDS, PATH_2_RUNE_IDS],
          id,
          true
        ).some((rid) => !runeState[rid])
      ) {
        setErrorMessage(
          "Cannot select a rune that has inactive runes before it"
        );
        return;
      }

      setRuneState((prev) => ({ ...prev, [id]: true }));
    },
    [runeState]
  );

  return (
    <div className="app-container">
      <h1>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>
      <p className="error-message">{errorMessage}</p>

      <div className="main-content-wrapper">
        <div className="talent-tree-container">
          <TalentTreePath
            runeIds={PATH_1_RUNE_IDS}
            pathId={1}
            runeState={runeState}
            handleRuneClick={handleRuneClick}
          />
          <TalentTreePath
            runeIds={PATH_2_RUNE_IDS}
            pathId={2}
            runeState={runeState}
            handleRuneClick={handleRuneClick}
          />
        </div>

        <div className="point-total-wrapper">
          <PointTotal runeState={runeState} />
        </div>
      </div>
    </div>
  );
};

export default App;
