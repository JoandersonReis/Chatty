import { Request, Response } from "express"
import ChatsServices from "../services/ChatsServices"

class ChatsController {
  async create(request: Request, response: Response) {
    const user_one_id = request.user_id
    const { user_two_id } = request.body

    const service = new ChatsServices()
    await service.create(user_one_id, user_two_id)


    return response.status(201).send()
  }
}

export default ChatsController