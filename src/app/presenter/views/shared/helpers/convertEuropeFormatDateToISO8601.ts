export const convertEuropeFormatDateToISO8601 = (date: Date): string => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}/${month}/${day}`;
};
