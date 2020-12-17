import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navBar: ElementRef;
  @Input('fixed-top') scrolling: boolean = true;
  transparent: Boolean = true;
  isAuth: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user.subscribe((res) => {
      console.log(res);

      if (!!res) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  onScroll() {
    if (this.scrolling) {
      if (window.pageYOffset > 100 && this.transparent) {
        this.navBar.nativeElement.classList.remove('is-spaced');
        this.transparent = false;
        this.navBar.nativeElement.style.backgroundColor = '';
      }
      if (window.pageYOffset < 50 && !this.transparent) {
        this.navBar.nativeElement.classList.add('is-spaced');
        this.transparent = true;
        this.navBar.nativeElement.style.backgroundColor = 'transparent';
      }
    }
  }
  ngAfterViewInit(): void {
    if (!this.scrolling) {
      this.navBar.nativeElement.style.backgroundColor = '';
    } else {
      this.navBar.nativeElement.style.backgroundColor = 'transparent';
    }
  }
  onLogout() {
    this.authService.logOut();
  }
}
