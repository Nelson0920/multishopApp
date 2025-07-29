import jwt      from 'jsonwebtoken'
import prisma   from "../../config/prisma.js"
import { JWT }  from '../../global/_var.js'

export class Users {
  static async verifyToken(token) {
    try {
      let msg = {
        status: false,
        msg: "Token no authorized",
        code: 404,
      }

      const verify = jwt.verify(token, JWT , (err, decode)=>{
        if(err) throw err
        return decode
      })

      const user = await prisma.user.findUnique({where: { id: verify.id }})

      if (user) {
        msg = {
            success: true,
            code: 200,
            message: "User Found",
            data: verify
          }
      }

      return msg

    } catch (error) {
      console.error("Error inventory: " , error)
    }
  }
}
