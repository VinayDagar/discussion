const jwt = require("jsonwebtoken")
import { AnyObject } from "../const"

export const createToken = (payload: AnyObject) => {
  if (!payload) throw new Error('Payload must be provided!')
  
  return jwt.sign(payload, process.env.APP_SECRET, {
    algorithm: 'HS256',
    expiresIn: process.env.JWT_EXPIRE_TIME,
  })
}

export const verifyToken = (token: string) => {
  if (!token) throw new Error('Token must be provided!')

  return jwt.verify(token, process.env.APP_SECRET)
}