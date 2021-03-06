import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthenticationService} from '../service/authentication.service';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        if(error.status === 403) {
          this.router.navigate(["/auth/login"])
        }
        return throwError(error.message);
      }
    }));
  }
}
