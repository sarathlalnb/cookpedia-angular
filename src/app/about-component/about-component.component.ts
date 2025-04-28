import { Component } from '@angular/core';
import { HomeComponentComponent } from "../home-component/home-component.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-about-component',
  imports: [HomeComponentComponent, HeaderComponent, FooterComponent],
  templateUrl: './about-component.component.html',
  styleUrl: './about-component.component.css'
})
export class AboutComponentComponent {

}
