export enum EHTTPStatusCode {
  SUCCEED = 200,
  CREATED = 201, // successfully created a new resource.
  ACCEPTED = 202, // still processing it.
  BAD_REQUEST = 400, // client-side error.
  UNAUTHORIZED = 401, // lacks valid authentication credentials.
  FORBIDDEN = 403, // not authorised to access this resource.
  NOT_FOUND = 404, // requested resource doesn't exist.
  INTERNAL_SERVER_ERROR = 500 // error on the server.
}
