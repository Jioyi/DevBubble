export const formatContent = (content) => {
  let newContent = content;
  newContent = newContent.split('@@@__').join('<a href="/user/');
  newContent = newContent.split('^^^__').join(`">@`);
  newContent = newContent.split('@@@^^^').join('</a>');
  return newContent;
};

export const sortDate = (a, b) => {
  var dateA = new Date(a.createdAt).getTime();
  var dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
};
