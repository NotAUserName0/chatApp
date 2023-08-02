import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private URL = "http://127.0.0.1:3000/user/";

  constructor(private http:HttpClient) { }

  friendList() {
      return this.http.get<Friend[]>(`${this.URL}friendStatus`)
  }
}
