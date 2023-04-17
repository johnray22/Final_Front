export function dateFormartter(date) {
  return date.replace('T', ' ').substring(0, 16)
}

export function dateFormartterNotime(date) {
  return date.replace('T', ' ').substring(0, 10)
}

export function duringDateCheck(startDateStr, endDateStr) {
  var curDate = new Date(),
    endDate = new Date(endDateStr.replace(/-/g, '/')),
    startDate = new Date(startDateStr.replace(/-/g, '/'));
  console.log(curDate, startDate, endDate)
  if (curDate <= endDate && curDate >= startDate) {//在时间段内
    return 1;
  } else if (curDate > endDate) {//过期
    return 2;
  } else if (curDate < startDate) {//未到
    return 3;
  }
  return false;
}


