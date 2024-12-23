export const getRuneValuesBeforeOrAfter = (
  talentTreePaths,
  id,
  isRequestingValuesBefore
) => {
  const runePathIndex = talentTreePaths.findIndex((path) => path.includes(id));
  if (runePathIndex === -1) {
    return [];
  }
  const runePath = talentTreePaths[runePathIndex];

  if (isRequestingValuesBefore) {
    return runePath.slice(0, runePath.indexOf(id));
  }

  return runePath.slice(runePath.indexOf(id) + 1);
};
