import db from "../database/connection"


interface IMessage {
  message: string,
  chat_id: number,
  owner_id: number,
  receiver_id: number,
}

class MessagesServices {
  async create(messageObj: IMessage) {
    try {

      const [ message ] = await db("messages")
        .insert(messageObj)
        .returning("*")


      return message

    } catch(err) {
      return { statusCode: 400, message: "Erro inesperdo, tente novamente!" }
    }
  }

  async show(chat_id: number, page: number = 1, limit: number = 15, user_id: number) {
    try {
      const [ chat ] = await db("chats")
        .where("chats.id", "=", chat_id)
        .select("*")

      const [ userOne ] = await db("users")
        .where("users.id", "=", chat.user_one_id)
        .select(["users.id", 
          "users.name", 
          "users.avatar", 
          "users.gender", 
          "users.cellnumber",
          "users.id",
        ])

      const [ userTwo ] = await db("users")
        .where("users.id", "=", chat.user_two_id)
        .select(["users.id", 
          "users.name", 
          "users.avatar", 
          "users.gender", 
          "users.cellnumber",
          "users.id",
        ])


      const messages = await db("messages")
        .where("messages.chat_id", "=", chat_id)
        .where("messages.owner_id", "=", user_id)
        .orWhere("messages.receiver_id", "=", user_id)
        .orderBy("id", "desc")
        .limit(limit)
        .offset((limit * page) - limit)
        .select("*")
      

      return { ...chat, userOne, userTwo, messages }
    } catch(err) {
      return { statusCode: 400, message: "Erro inesperdo, tente novamente!" }
    }

  }
}

export default MessagesServices
