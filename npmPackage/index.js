const localModule = require('./localModule')
const { compareAsc, format } = require("date-fns");


console.log(localModule('pooja'))


console.log(format(new Date(2014, 1, 11), "yyyy-MM-dd"));

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
console.log(dates.sort(compareAsc));
