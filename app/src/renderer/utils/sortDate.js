export const sortDate = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA < dateB ? 1 : -1;
};

export const sortDateReverse = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
};
