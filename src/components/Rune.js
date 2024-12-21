import talentSprite from "../assets/talent-icons-sprite.png";

const Rune = ({ id, isActive, handleClick }) => {
  // Dynamic style for the rune sprite
  const runeStyle = {
    backgroundImage: `url(${talentSprite})`,
    backgroundPosition: `-${id * 50}px -${isActive ? 0 : 50}px`,
    position: "relative",
    zIndex: 2,
  };

  return (
    <div className={`rune-wrapper ${isActive ? "" : "inactive"}`}>
      <div
        className="rune"
        style={runeStyle}
        id={id}
        onClick={(e) => handleClick(id, e.button === 2)}
        onContextMenu={(e) => {
          e.preventDefault();
          handleClick(id, true);
        }}
      ></div>
    </div>
  );
};

export default Rune;
