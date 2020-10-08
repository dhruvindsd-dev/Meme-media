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

  async confirm() {setTimeout(function check() {
    const pass1 = (document.getElementById('pass1') as HTMLInputElement).value;
    const pass2 = (document.getElementById('pass2') as HTMLInputElement).value;
    (document.getElementById('create') as HTMLButtonElement).disabled = pass1 !== pass2;
  }, 100);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      if (params['type'] == 'login') {
        this.newUser = false;
      } else {
        this.newUser = true;
      }
    })

  }
}
