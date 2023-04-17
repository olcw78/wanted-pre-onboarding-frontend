export enum EHTTPStatusCode {
  SUCCEED = 200,
  CREATED = 201, // successfully created a new resource.
  ACCEPTED = 202, // still processing it.
  NO_CONTENT = 204, // no content.
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  GONE = 410, // client-side error.
  BAD_REQUEST = 400, // client-side error.
  UNAUTHORIZED = 401, // lacks valid authentication credentials.
  FORBIDDEN = 403, // not authorised to access this resource.
  NOT_FOUND = 404, // requested resource doesn't exist.
  TOO_MANY_REQUESTS = 429, // rate-limit exceeded.
  INTERNAL_SERVER_ERROR = 500 // error on the server.
}
