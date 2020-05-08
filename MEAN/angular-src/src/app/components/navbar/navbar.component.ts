import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private AuthService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogoutClick() {
    this.AuthService.logOut();
    this.flashMessage.show('Logged Out', {
      cssClass: 'alert-success',
      timeout: 1000,
    });

    this.router.navigate(['/', 'login']);
    return false;
  }

  checkLoggedIn() {
    return this.AuthService.loggedIn();
  }
}
