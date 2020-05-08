import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private AuthService: AuthService, private Router: Router) {}

  ngOnInit(): void {
    this.AuthService.getProfile().subscribe(
      (profile: any) => {
        this.user = profile.user;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
