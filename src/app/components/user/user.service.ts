import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { HttpHelpers } from 'src/app/helpers/http-helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = "http://127.0.0.1:3000/user/";

  constructor(private http:HttpClient,
    private helper:HttpHelpers) { }



  changeStatus(status:string){
    const json = {
      status: status
    }
    return this.http.post<any>(`${this.URL}updateStatus`,JSON.stringify(json),this.helper.httpOptions)
  }

  editName(name:string){
    const json = {
      user: name
    }
    return this.http.put<any>(`${this.URL}modUser`,JSON.stringify(json),this.helper.httpOptions)
  }

  addFriend(user:string){
    const json = {
      user: user
    }
    return this.http.post<any>(`${this.URL}addFriend`,JSON.stringify(json),this.helper.httpOptions)
  }


}
