import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
  });

  constructor(
    private AuthService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password,
    };

    this.AuthService.authenticateUser(user).subscribe((res) => {
      if (res.success) {
        this.AuthService.storeUserData(res.token, res.user);

        this.flashMessage.show('Login Successful', {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.router.navigate(['/', 'dashboard']);
      } else {
        this.flashMessage.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'login']);
      }
    });
  }
}
