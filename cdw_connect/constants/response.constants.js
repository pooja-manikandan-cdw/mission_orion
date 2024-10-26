const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

MESSAGES = {
  SUCCESS: {
    PENDING_USERS_FETCH_SUCCESS: "Fetched pending users successfully",
  },
  FAILURE: {
    PENDING_USERS_NOT_FOUND: "No more pending users found",
    USER_NOT_FOUND: "User not found for id - ${id}",
    UNABLE_TO_CREATE_POST: "Unable to create posts",
    UNABLE_TO_DELETE_POST: "Unable to delete posts",
    UNABLE_TO_FIND_POST: "Unable to find post",
    UNABLE_TO_FIND_USER: "Unable to find user",
  },
  AUTHENTICATION: {
    USER_NOT_AUTHORIZED: "Access denied for the user",
  },
};

module.exports = { STATUS_CODES, MESSAGES };
