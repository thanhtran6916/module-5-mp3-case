import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {environment} from '../../environments/environment';

const URL = `${environment.URL_API}auth/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<UserToken>;

  public currenUser: Observable<UserToken>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currenUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserToken> {
    return this.httpClient.post<UserToken>(URL + "login", {username, password});
  }

  get currenUserValue() {
    return this.currentUserSubject.value;
  }
}
