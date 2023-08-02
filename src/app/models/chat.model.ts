export class Chat {
  _id:String
  userA:String
  userB:String
  name:String
  messages: Message[]
}

export interface Message {
  emisor: string;
  text: string;
  date: string;
  status: string;
}
