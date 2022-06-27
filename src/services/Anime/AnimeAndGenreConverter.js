const convertToString = (array) => array.reduce((x, y) => x + ", " + y, "");
const substringToBeRemoved = ", ";

// convert array of genres to string which will be useful
// for fetching recommendation
export const favoriteGenreListToGenreString = (genres) => {
  const str = convertToString(genres);
  return str.replace(substringToBeRemoved, "");
};

// convert anime data to string which will be useful
// for fetching recommendation
export const animeDetailsToGenreString = (animeData) => {
  const str =
    convertToString(animeData.genres) +
    convertToString(animeData.themes) +
    convertToString(animeData.demographics);
  return str.replace(substringToBeRemoved, "");
};
