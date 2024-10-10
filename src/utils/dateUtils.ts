export function formateTime(time: number) {
  if (!time) return '';
  let d = new Date(time);
  let year: string | number = d.getFullYear();
  let month: string | number = d.getMonth() + 1;
  let day: string | number = d.getDate();
  let houst: string | number = d.getHours();
  let min: string | number = d.getMinutes();
  let sec: string | number = d.getSeconds();
  year = year < 10 ? '0' + year : year;
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  houst = houst < 10 ? '0' + houst : houst;
  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;

  return `${year}- ${month}- ${day} ${houst}: ${min}: ${sec} `;
}
export function formateDate(time: number) {
  if (!time) return '';
  let d = new Date(time);
  let year: string | number = d.getFullYear();
  let month: string | number = d.getMonth() + 1;
  let day: string | number = d.getDate();
  year = year < 10 ? '0' + year : year;
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${year}- ${month}- ${day}`;
}
