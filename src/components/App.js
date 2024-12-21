import "../App.css";
import React, { useState } from "react";
import TalentTree from "./TalentTree";
import PointTotal from "./PointTotal";
import getRuneValuesBeforeOrAfter from "../helper";

const App = () => {
  const path1RuneIds = [0, 1, 2, 3];
  const path2RuneIds = [4, 5, 6, 7];

  const [runeState, setRuneState] = useState(
    [...path1RuneIds, ...path2RuneIds].reduce((defaultRuneState, id) => {
      defaultRuneState[id] = false;
      return defaultRuneState;
    }, {})
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = (id, isRightClick = false) => {
    // Handle right click
    if (isRightClick) {
      const runeValuesAfter = getRuneValuesBeforeOrAfter(
        [path1RuneIds, path2RuneIds],
        id,
        false
      );

      // Check if any runes after this one are active
      const hasActiveRunesAfter = runeValuesAfter.some(
        (runeId) => runeState[runeId]
      );

      if (runeState[id]) {
        // Only allow deactivation if no runes after this one are active
        if (!hasActiveRunesAfter) {
          setRuneState((prev) => ({ ...prev, [id]: false }));
          setErrorMessage("");
        } else {
          setErrorMessage(
            "Cannot deactivate a rune that has active runes after it"
          );
        }
      }
      return;
    }

    // Handle left click
    // If rune is already selected, do nothing
    if (runeState[id]) {
      return;
    }
    // If 6 runes are already selected, display error message
    if (
      Object.values(runeState).filter(Boolean).length === 6 &&
      !runeState[id]
    ) {
      setErrorMessage("You can only select up to 6 runes");
      return;
    }
    const runeValuesBefore = getRuneValuesBeforeOrAfter(
      [path1RuneIds, path2RuneIds],
      id,
      true
    );

    // Check if any runes before this one are inactive
    const hasInactiveRunesBefore = runeValuesBefore.some(
      (runeId) => !runeState[runeId]
    );
    // Only allow activation if no runes before this one are inactive
    if (hasInactiveRunesBefore) {
      setErrorMessage("Cannot select a rune that has inactive runes before it");
      return;
    }
    setRuneState((prev) => ({ ...prev, [id]: !prev[id] }));
    setErrorMessage("");
  };

  return (
    <div className="app-container">
      <h1>TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="main-content-wrapper">
        <div className="talent-tree-container">
          <TalentTree
            runeIds={path1RuneIds}
            pathId={1}
            runeState={runeState}
            handleClick={handleClick}
          />
          <TalentTree
            runeIds={path2RuneIds}
            pathId={2}
            runeState={runeState}
            handleClick={handleClick}
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
