import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private URL = "http://127.0.0.1:3000/user/";
  private URLc = "http://127.0.0.1:3000/chat/";

  constructor(private http:HttpClient) { }

  deleteFriend(id:string){
    return this.http.delete(`${this.URL}delFriend/${id}`)
  }

  deleteChatSession(id:string){
    return this.http.delete(`${this.URLc}delChat/${id}`)
  }
}
