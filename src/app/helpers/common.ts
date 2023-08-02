import { Injectable } from "@angular/core"
import { CookieService } from "ngx-cookie-service"
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class Common {

  constructor(private cookie: CookieService) { }

  getClaims() { /* GET User data from token */
    const token = this.cookie.get("token")
    const decodedToken = jwt_decode(token)

    return decodedToken['claims']
  }
}
