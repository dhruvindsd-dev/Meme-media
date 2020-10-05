import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('navbar') navBar: ElementRef;
  transparent: Boolean = true;
  constructor() {}

  ngOnInit(): void {}

  onScroll(event) {
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
  