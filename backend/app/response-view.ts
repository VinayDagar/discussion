import { AnyObject } from "../const";

export const JsonView = function <T>(result: T, statusCode: number = 200) {
  const date = new Date();

  return {
    error: false,
    object: result,
    message: "",
    extendedMessage: "",
    status: statusCode,
    timeStamp: date.toISOString()
  }
}
export const ErrorView = function (error: AnyObject) {
  const date = new Date();

  return {
    error: true,
    object: {
      message: error.message,
      meta: error
    },
    message: error.message,
    extendedMessage: error.extendedMessage,
    timeStamp: date.toISOString(),
    status: error.statusCode
  }
}
