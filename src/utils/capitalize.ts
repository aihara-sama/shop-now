export const capitalize = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};
