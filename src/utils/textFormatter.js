
export const formatVolume = (num) => {
  if (!num) return num;

  if (num >= 10000000) return (num / 10000000).toFixed(1) + 'Cr';
  if (num >= 100000) return (num / 100000).toFixed(1) + 'L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';

  return num;
};

export const getErrorMessage = (errorObj, ...keys) => {
  const keysToMatch = ["message"].concat(keys);

  const regexToMatch = new RegExp(`"(${keysToMatch.join("|")})":\s*"([^"]*)"`, "g");
  const stringifiedError = JSON.stringify(errorObj);

  const matches = Array.from(stringifiedError.matchAll(regexToMatch));

  return matches.map(([, , match]) => match).join(". ");
};

export const capitalize = (text = "") =>
  text[0]?.toUpperCase() + text.slice(1)?.toLowerCase();

export const titleize = (text) =>
  text.split(/[\W_]+/).map(capitalize).join(" ");
