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
    EMPLOYEE: {
      SUCCESS_SIGNUP: "Signed in sucessfully, wait for approval",
    },
    PENDING_USERS_FETCH_SUCCESS: "Fetched pending employees successfully",
  },
  FAILURE: {
    EMPLOYEE: {
      EMPLOYEE_EXIST: "Employee already signed up",
      UNABLE_TO_FIND_EMPLOYEE: "Employee not found to sign up",
    },
    PENDING_USERS_NOT_FOUND: "No more pending employees found",
    USER_NOT_FOUND: "User not found for id - ${id}",
    UNABLE_TO_CREATE_POST: "Unable to create posts",
    UNABLE_TO_DELETE_POST: "Unable to delete posts",
    UNABLE_TO_FIND_POST: "Unable to find post",
    UNABLE_TO_FIND_USER: "Unable to find employee",
  },
  AUTHENTICATION: {
    USER_NOT_AUTHORIZED: "Access denied for the employee",
  },
  SIGN_IN: {
    WAITING_FOR_APPROVAL: 'account is still waiting for approval',
    REJECTED: 'your account is rejected, register after 2 days'
  }
};

module.exports = { STATUS_CODES, MESSAGES };
