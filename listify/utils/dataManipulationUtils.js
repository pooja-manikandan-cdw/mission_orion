const AppError = require("../AppError");
const { PRIORITY_ORDER } = require("../constants/app");

const checkEntireExists = (data, item, key) => {
  const foundData = data?.find((dataItem) => dataItem[key] === item);
  return foundData;
};

const getEntireIndex = (data, item, key) => {
  const index = data.findIndex((dataItem) => dataItem[key] === item);
  return index;
};

const sortByTitle = async (data, orderBy) => {
  if (orderBy === "asc") {
    return data.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  } else if (orderBy === "desc") {
    return data.sort(function (a, b) {
      if (b.title < a.title) {
        return -1;
      }
      if (b.title > a.title) {
        return 1;
      }
      return 0;
    });
  } else {
    throw new AppError(400, "Invalid query params", "INVALID_QUERY_PARAM");
  }
};

const sortByPriority = async (data, orderBy) => {
  if (orderBy === "asc") {
    return data.sort(function (a, b) {
      return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    });
  } else if (orderBy === "desc") {
    return data.sort(function (a, b) {
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });
  } else {
    throw new AppError(400, "Invalid query params", "INVALID_QUERY_PARAM");
  }
};

const sortByDueDate = async (data, orderBy) => {
  if (orderBy === "asc") {
    return data.sort(function (a, b) {
      if (new Date(a.dueDate) < new Date(b.dueDate)) {
        return -1;
      }
      if (new Date(a.dueDate) > new Date(b.dueDate)) {
        return 1;
      }
      return 0;
    });
  } else if (orderBy === "desc") {
    return data.sort(function (a, b) {
      if (new Date(b.dueDate) < new Date(a.dueDate)) {
        return -1;
      }
      if (new Date(b.dueDate) > new Date(a.dueDate)) {
        return 1;
      }
      return 0;
    });
  }
};

module.exports = {
  checkEntireExists,
  getEntireIndex,
  sortByTitle,
  sortByPriority,
  sortByDueDate,
};
