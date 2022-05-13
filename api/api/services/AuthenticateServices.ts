import { compareSync, genSalt, hash } from "bcrypt"
import { sign } from "jsonwebtoken"
import db from "../database/connection"

export default class AuthenticateServices {
  async create(name: string, cellnumber: string, gender: string, password: string) {
    try {
      genSalt(10, (err, salt) => {
        hash(password, salt, async (err, hash) => {
          await db("users").insert({
            name,
            password: hash,
            gender,
            cellnumber
          })
        })
      })

      return { statusCode: 201, message: "Conta criada com sucesso" }
    } catch(err) {
      return { statusCode: 400, message: "Erro ao criar conta, verifique seus dados!" }
    }
  }


  async auth(cellnumber: string, password: string) {

    try {

      const [user] = await db("users")
        .where("cellnumber", `55${cellnumber}`)
        .select("*")

      if(user) {
        const result = compareSync(password, user.password)

        if(result) {

          const token = sign(
            {
              user: {
                cellnumber,
                id: user.id,
                name: user.name
              }
            },
            process.env.JWT_SECRET,
            {
              subject: String(user.id),
              expiresIn: "365d"
            }
          )

          return { statusCode: 200, token, id: user.id, cellnumber: user.cellnumber, name: user.name, bio: user.bio, avatar: user.avatar }

        } else {
          return { statusCode: 401, message: "Senha incorreta" }
        }
      } else {
        return { statusCode: 404, message: "Usuário não encontrado" }
      }

    } catch(err) {
      return { statusCode: 404, message: "Usuário não encontrado" }
    }

  }
}