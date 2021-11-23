import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {Injectable} from '@angular/core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currenUser = this.authenticationService.currenUserValue;
    if (currenUser && currenUser.token) {
      req = req.clone({
        setHeaders: {
          Authorization: currenUser.token
        }
      })
    }
    return next.handle(req);
  }
}
