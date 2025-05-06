import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  loggedInUserName: string = '';

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true;
      let val = JSON.parse(sessionStorage.getItem('user')|| '')
      this.loggedInUserName = val.userName  ;
    }
  }
}
