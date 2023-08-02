import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHelpers } from 'src/app/helpers/http-helpers';
import { Chat } from 'src/app/models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private URL = "http://127.0.0.1:3000/chat/";
  chat:Chat

  constructor(private http:HttpClient,
    private helper:HttpHelpers) { }

  getChat(id:String){
    const json = {
      id: id
    }
    return this.http.post<Chat>(`${this.URL}initChat`,JSON.stringify(json),this.helper.httpOptions)
  }

  newMessage(chatID:String, text:String){
    const json = {
      chatID: chatID,
      text: text
    }
    return this.http.post<any>(`${this.URL}newMessage`,JSON.stringify(json),this.helper.httpOptions)
  }
}
