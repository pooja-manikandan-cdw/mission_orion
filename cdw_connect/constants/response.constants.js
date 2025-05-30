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
      SUCCESS_SIGNIN: "logged in successfully",
      SUCCESS_STATUS_UPDATE: "status updated successfully",
      SUCCESS_PROFILE_UPDATE: "profile updated successfully",
      SUCCESS_EMPLOYEE_FETCH: "employee details fetched successfully",
    },
    PENDING_USERS_FETCH_SUCCESS: "Fetched pending employees successfully",
    POSTS: {
      SUCCESS_POST_CREATED: "post created successfully",
      SUCCESS_POSTS_FETCHED: "posts retrieved successfully",
      POST_DELETED_SUCCESS: "post deleted successfully",
      FILTERED_POST_SUCCESS: "retrevied for posts email",
      UPDATED_LIKE: "like updated for the post",
      UPDATED_COMMENT: "comment updated for the post",
      SEARCH_POSTS_SUCCESS: "search posts successfully",
    },
  },
  FAILURE: {
    EMPLOYEE: {
      EMPLOYEE_EXIST: "Employee already signed up",
      UNABLE_TO_FIND_EMPLOYEE: "Employee not found to sign up",
    },
    EMPLOYEE_STATUS_REJECT:
      "Employee have been rejected try again after 2 days",
    PENDING_USERS_NOT_FOUND: "No more pending employees found",
    USER_NOT_FOUND: "User not found for id - ${id}",
    UNABLE_TO_CREATE_POST: "Unable to create posts",
    UNABLE_TO_DELETE_POST: "Unable to delete posts",
    UNABLE_TO_FIND_POST: "Unable to find post",
    UNABLE_TO_FIND_USER: "Unable to find employee",
    UNABLE_UPDATE_ADMIN_STATUS: "trying to update admin status",
    INVALID_STATUS_RECEIVED: "invalid status received for approval",
    VALIDATION_FAILED: "Payload validation failed -",
  },
  AUTHENTICATION: {
    USER_NOT_AUTHORIZED: "Access denied for the employee",
  },
  SIGN_IN: {
    WAITING_FOR_APPROVAL: "account is still waiting for approval",
    REJECTED_MESSAGE: "your account is rejected, register after 2 days",
  },
};

module.exports = { STATUS_CODES, MESSAGES };
