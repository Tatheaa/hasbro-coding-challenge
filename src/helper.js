const getRuneValuesBeforeOrAfter = (arrays, id, isRequestingValuesBefore) => {
  for (const array of arrays) {
    const index = array.indexOf(id);
    if (index !== -1) {
      if (isRequestingValuesBefore) {
        // Return all values before the found value
        return array.slice(0, index);
      } else {
        // Return all values after the found value
        return array.slice(index + 1);
      }
    }
  }
  return [];
};

export default getRuneValuesBeforeOrAfter;
