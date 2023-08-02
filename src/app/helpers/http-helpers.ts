import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

export class HttpHelpers {

  httpOptions = { //al enviar usar
    headers : new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  /* HTTP ERROR HANDLER */
  handleError(error: HttpErrorResponse) {
    let errorString = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      errorString = "Network Error"
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        errorString = `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorString));
  }
}
