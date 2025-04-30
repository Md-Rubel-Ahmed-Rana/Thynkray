/* eslint-disable @typescript-eslint/no-explicit-any */

const compareFieldsChanges = (
  oldValues: Record<string, any>,
  newValues: Record<string, any>
): boolean => {
  return Object.keys(newValues).some((key) => {
    return oldValues[key] !== newValues[key];
  });
};

export default compareFieldsChanges;
