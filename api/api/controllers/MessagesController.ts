import { Request, Response } from "express";
import ChatsServices from "../services/ChatsServices";
import MessagesServices from "../services/MessagesServices";


class MessageController {
  async create(request: Request, response: Response) {
    const { message, receiver_id, chat_id } = request.body
    const user_id = request.user_id

    const chatsServices = new ChatsServices()
    const messagesServices = new MessagesServices()

    const chatResult = await chatsServices.create(
      Number(user_id), 
      Number(receiver_id), 
      chat_id && Number(chat_id))

    const messageResult = await messagesServices.create({
      chat_id: chatResult.chat.id,
      owner_id: Number(user_id),
      receiver_id: Number(receiver_id),
      message
    })

    return response.json({...messageResult, chat: chatResult.chat})
  }

  async show(request: Request, response: Response) {
    const { page, limit } = request.query
    const { id } = request.params
    const user_id = request.user_id

    const service = new MessagesServices()
    const result = await service.show(Number(id), page && Number(page), limit && Number(limit), Number(user_id))

    return response.json(result)
  }
}

export default MessageController