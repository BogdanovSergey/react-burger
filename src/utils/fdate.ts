export const formatDate = (date: Date): string => {
  let today = new Date();
  let targetDate = new Date(date);
  let hours: string | number = targetDate.getHours();
  let minutes: string | number = targetDate.getMinutes();
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  let msInDay = 24 * 60* 60 * 1000;
  today.setHours(0,0,0,0);
  targetDate.setHours(0,0,0,0);
  let dif: string | number = (+today - +targetDate)/msInDay;
  if (dif === 0) dif = 'Сегодня';
  if (dif === 1) dif = 'Вчера';
  if (dif > 1) dif = dif + ' дн. назад';
  let timeZone = (targetDate.getTimezoneOffset())/60;

  return dif + ', ' + hours + ':' + minutes + ' i-GMT' + (timeZone > 0 ? timeZone : '+'  + timeZone * -1);
}