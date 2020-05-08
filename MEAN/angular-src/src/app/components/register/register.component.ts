import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill out all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
    //Calling the http server for posting the data
    this.AuthService.sendPostRequest(user).subscribe((res) => {
      if (res.success) {
        this.flashMessage.show('You are registered', {
          cssClass: 'alert-success',
          timeout: 1000,
        });

        this.router.navigate(['/', 'login']);
      } else {
        this.flashMessage.show('Registration Unsuccessful', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        this.router.navigate(['/', 'register']);
      }
    });
  }
}
