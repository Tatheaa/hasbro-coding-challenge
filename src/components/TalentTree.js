import React from "react";
import Rune from "./Rune";

const TalentTree = ({ runeIds, pathId, runeState, handleClick }) => {
  return (
    <div className="talent-tree-path-container">
      <h3 className="talent-tree-path-name">TALENT PATH {pathId}</h3>
      {runeIds.map((id, index) => (
        <React.Fragment key={index}>
          <Rune id={id} isActive={runeState[id]} handleClick={handleClick} />
          {index !== 3 && (
            //Verify if rune before and after the connector are active, if so, use active class
            <span
              className={
                runeState[id] && runeState[runeIds[index + 1]]
                  ? "rune-connection active"
                  : "rune-connection"
              }
            ></span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TalentTree;
