const PointTotal = ({ runeState }) => {
  const totalPoints = Object.values(runeState).filter(Boolean).length;
  return (
    <div className="point-total-container">
      <span>{totalPoints} / 6</span>
      <span className="point-total-label">Points Spent</span>
    </div>
  );
};

export default PointTotal;
