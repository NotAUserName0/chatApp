import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';



export const loginGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService)
  const router = inject(Router)

  if(cookie.check("token")){ //si hay token en cookie regresa a home
    router.navigate(['/home'])
    return false
  }else{ //si no, no deja pasar
    return true
  }
};
