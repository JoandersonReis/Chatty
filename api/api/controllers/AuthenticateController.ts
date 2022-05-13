import { Request, Response } from "express";
import AuthenticateServices from "../services/AuthenticateServices";


export default class AuthenticateController {
  async signUp(request: Request, response: Response) {
    const { name, gender, cellnumber, password } = request.body

    const service = new AuthenticateServices()
    const result = await service.create(name, cellnumber, gender, password)

    return response.json(result)
  }

  async login(request: Request, response: Response) {
    const { cellnumber, password } = request.body

    const service = new AuthenticateServices()
    const result = await service.auth(cellnumber, password)

    return response.json(result)
  }
}
