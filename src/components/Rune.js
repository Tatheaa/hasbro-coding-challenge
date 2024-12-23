import talentSprite from "../assets/talent-icons-sprite.png";

const Rune = ({ id, isActive, handleRuneClick }) => {
  // Dynamic style for the rune sprite image
  const runeStyle = {
    backgroundImage: `url(${talentSprite})`,
    backgroundPosition: `-${id * 50}px -${isActive ? 0 : 50}px`,
  };

  return (
    // Rune wrapper div displays the split border around the rune - blue on active, gray on inactive
    <div className={`rune-wrapper ${isActive ? "" : "inactive"}`}>
      <div
        className="rune"
        style={runeStyle}
        id={id}
        onClick={(e) => handleRuneClick(id, e.button === 2)}
        onContextMenu={(e) => {
          e.preventDefault();
          handleRuneClick(id, true);
        }}
      ></div>
    </div>
  );
};

export default Rune;
