const hasTwoDaysPassed = (date) => {
  const inputDate = new Date(date);
  const currentDate = new Date();
  const timeDifference = currentDate - inputDate;
  const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000;
  return timeDifference >= twoDaysInMilliseconds;
};

module.exports = { hasTwoDaysPassed };
