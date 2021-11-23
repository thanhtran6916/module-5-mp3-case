import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;

  userToken: UserToken = {};

  userForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  user: User = {};

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.user = this.userForm.value;
    this.subscription = this.authenticationService.login(this.user.username, this.user.password).subscribe(data => {
      this.userToken = data;
      localStorage.setItem('user', JSON.stringify(this.userToken));
      this.router.navigate(['/songs/list'])
    }, error => console.log(error.message));
  }

}
