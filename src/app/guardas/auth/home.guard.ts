import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const homeGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService)
  const router = inject(Router)

  if(cookie.check("token")){ //si hay token pasa
    return true;
  }else{ //si no hay token pasa al loggin
    router.navigate(['/auth']);
    return false;
  }
};
