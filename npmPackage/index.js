const localPackage = require('./localPackage')
const { compareAsc, format } = require("date-fns");


console.log(localPackage('pooja'))


console.log(format(new Date(2014, 1, 11), "yyyy-MM-dd"));
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
console.log(dates.sort(compareAsc));
