exports.localizedSort = (array, languageCode, valueSelector) => {
  if (!valueSelector) valueSelector = (x) => x;
  const temp = [...array];
  temp.sort((a, b) =>
    valueSelector(a).localeCompare(valueSelector(b), languageCode),
  );
  return temp;
};
