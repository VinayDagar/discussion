const crypto = require('crypto')


export const createHash = (salt: string, value: string) => {
  // const createHash = (salt, value) => {
  return crypto.createHmac('sha1', salt).update(value).digest('hex');

}