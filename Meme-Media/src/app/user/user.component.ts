import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  newUser: Boolean;
  error: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['type'] == 'login') {
        this.newUser = false;
      } else {
        this.newUser = true;
      }
      this.error = '';
    });
  }
  onSubmit(f: NgForm) {
    const formData = new FormData();
    formData.append('email', f.value.email);
    formData.append('password', f.value.password);
    if (this.newUser) {
      // signup
      formData.append('username', f.value.username);
      console.log(formData);

      this.authService.signUp(formData).subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.error = err;
        }
      );
    } else {
      console.log(f);
      // sign in
      console.log(formData);

      this.authService.getToken(formData).subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (err) => {
          this.error = err;
        }
      );
    }
  }
}
