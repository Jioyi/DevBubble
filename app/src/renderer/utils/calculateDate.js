export const calculateDate = (time) => {
  let date = new Date(time);
  let minutes = date.getMinutes().toString();
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  let hours = date.getHours().toString();
  hours = hours.length < 2 ? `0${hours}` : hours;
  let day = date.getDate().toString();
  day = day.length < 2 ? `0${day}` : day;
  let month = (date.getMonth() + 1).toString();
  month = month.length < 2 ? `0${month}` : month;
  let year = date.getFullYear();
  let day_diff = daysDifference(date);
  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  if (day_diff === 0) {
    return `hoy a las ${hours}:${minutes}`;
  } else if (day_diff === 1) {
    return `ayer a las ${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};

const daysDifference = (date) => {
  var diff = new Date().setHours(12) - new Date(+date).setHours(12);
  return Math.round(diff / 8.64e7);
}
