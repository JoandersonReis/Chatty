import db from "../database/connection"


class ChatsServices {
  async create(user_one_id: number, user_two_id: number, chat_id?: number) {
    try {
      let chat = {id: 0}

      if(chat_id) {
        [chat] = await db("chats")
          .where("chats.id", "=", chat_id)
          .select("*")
      } else {

        [chat] = await db("chats")
          .insert({
            user_one_id,
            user_two_id
          }).returning("*")
  
        }
        
      return { statusCode: 201, message: "Criado com sucesso", chat }

    } catch(err) {
      return { statusCode: 400, message: "Erro desconhecido" }
    }
  }
}

export default ChatsServices