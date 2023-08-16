import { TUser } from "../types"
import { TToken } from "../types"

export class CLoginResponse {
  id: string
  message:string
  user:TUser
  token:TToken


  constructor(items: CLoginResponse){
    this.id = items.id
    this.message = items.message
    this.user = items.user
    this.token = items.token
  }
}
