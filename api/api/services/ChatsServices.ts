import db from "../database/connection"


class ChatsServices {
  async create(user_one_id: string, user_two_id: string) {
    try {
      await db("chats").insert({
        user_one_id,
        user_two_id
      })

      return { statusCode: 201, message: "Criado com sucesso" }

    } catch(err) {
      return { statusCode: 400, message: "Erro desconhecido" }
    }
  }
}

export default ChatsServices