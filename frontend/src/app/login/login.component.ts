import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.api
      .login({ username: this.username, password: this.password })
      .subscribe(
        (data: any) => {
          if (data.status == 'success' && data.token !== undefined) {
            sessionStorage.setItem('token', data.token);
            this.router.navigate(['/search']);
          }
        },
        (err) => {
          alert('Login failed');
        }
      );
  }
}
