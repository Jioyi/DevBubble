export const calculateDate = (time) => {
  let date = new Date(time);
  let minutes = date.getMinutes().toString();
  minutes = minutes.length < 2 ? `0${minutes}` : minutes;
  let hours = date.getHours().toString();
  hours = hours.length < 2 ? `0${hours}` : hours;
  let day = date.getDate().toString();
  let month = (date.getMonth() + 1).toString();
  let year = date.getFullYear();
  let diff = (new Date().getTime() - date.getTime()) / 1000;
  let day_diff = Math.floor(diff / 86400);
  if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

  if (day_diff === 0) {
    return `hoy a las ${hours}:${minutes}`;
  } else if (day_diff === 1) {
    return `ayer a las ${hours}:${minutes}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};
