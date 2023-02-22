import * as moment from 'moment';

export const utilService = {
  makeId,
  timeStampConverter,
  generateFlightNumber,
  getTimeDifference
}

function getTimeDifference(dateString1: string, dateString2: string): string {
  const format = 'MM/DD/YYYY - HH:mm';
  const date1 = moment(dateString1, format);
  const date2 = moment(dateString2, format);
  let diffInMinutes: string | number = 0;
  if (date1.isSame(date2, 'day')) diffInMinutes = Math.abs(date2.diff(date1, 'minutes'));

  else {
    //sometimes the moment library probably doesnt transform to milseconds correctly so i did the math on my own
    dateString1 = dateString1.substring(12)
    dateString2 = dateString2.substring(12)
    let hours1 = dateString1.substring(0, 3)
    let hours2 = dateString2.substring(0, 3)
    let mins1 = dateString1.substring(4)
    let mins2 = dateString2.substring(4)
    let num1 = ((+hours1 * 60) + (+mins1)) - (24 * 60)
    let num2 = (+hours2 * 60) + (+mins2)
    diffInMinutes = (num2 - num1)
  }
  diffInMinutes = 'Flight delayed by ' + diffInMinutes + ' minutes'
  return diffInMinutes;
}

function makeId(length = 5): string {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function timeStampConverter(timestamp: number) {

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const date = new Date(timestamp)
  const day = date.getDate()
  const month = months[date.getMonth()]
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return (`${day} ${month} at ${formattedHours}:${formattedMinutes}`)
}

const fligntNumberSet = new Set<string>();
function generateFlightNumber(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  result += chars.charAt(Math.floor(Math.random() * chars.length)) + chars.charAt(Math.floor(Math.random() * chars.length));
  for (let i = 0; i < 4; i++) {
    result += Math.floor(Math.random() * 10);
  }
  if (fligntNumberSet.has(result)) {
    return generateFlightNumber();
  } else {
    fligntNumberSet.add(result);
    return result;
  }
}

