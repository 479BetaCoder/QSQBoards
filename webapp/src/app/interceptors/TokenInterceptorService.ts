import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export class TokenInterceptorService implements HttpInterceptor {

  // We inject a LoginService
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR');
    // We retrieve the token, if any
    const token = localStorage.getItem('token');
    let newHeaders = req.headers.set('Content-Type', 'application/json');
    if (token) {
      // If we have a token, we append it to our new headers
      newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
    }
    // Finally we have to clone our request with our new headers
    // This is required because HttpRequests are immutable
    const authReq = req.clone({headers: newHeaders});
    // Then we return an Observable that will run the request
    // or pass it to the next interceptor if any
    return next.handle(authReq);
  }
}
