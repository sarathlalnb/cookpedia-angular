import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAdmin: boolean = false;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    let val = JSON.parse(sessionStorage.getItem('user') || '');
    console.log(val);
    if (val.userType == 'admin') {
      this.isAdmin = true;
    }
  }

  title = 'cookpedia';
}
