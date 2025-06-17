export const RangeFilterFormat = (val: {
  min: number | null;
  max: number | null;
}) => {
  if (!val || (val.min === null && val.max === null)) return "Any";
  if (val.min !== null && val.max !== null) return `${val.min} – ${val.max}`;
  if (val.min !== null) return `From ${val.min}`;
  if (val.max !== null) return `Up to ${val.max}`;
  return "Any";
};
