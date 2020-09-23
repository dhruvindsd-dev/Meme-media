import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  newUser: Boolean;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.params['type'] == 'login') {
      this.newUser = false;
    } else {
      this.newUser = true;
    }
  }
}
