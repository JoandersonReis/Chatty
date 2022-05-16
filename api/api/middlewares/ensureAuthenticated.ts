import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";


export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization

  if(!token) {
    return response.status(401).json({statusCode: 401, message: "Token required"})
  }

  try {
    const { sub } = verify(token, process.env.JWT_SECRET)
  
    request.user_id = String(sub)

    next()
  } catch(err) {
    return response.status(401).json({statusCode: 401, message: "Token inválid"})
  }
}
