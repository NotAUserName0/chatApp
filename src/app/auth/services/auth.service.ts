import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpHelpers } from 'src/app/helpers/http-helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = "http://127.0.0.1:3000/user/";

  constructor(private http:HttpClient,
    private helper:HttpHelpers) { }

  login(user:any){
    return this.http.post<any>(`${this.URL}login`,user,this.helper.httpOptions)
  }

  register(newUser:any){
    return this.http.post<any>(`${this.URL}register`,newUser,this.helper.httpOptions)
  }
}
