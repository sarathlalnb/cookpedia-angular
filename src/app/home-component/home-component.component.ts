import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent implements OnInit {
  recipeArray: any = [];
  testmonyArray:any = []

  // di
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getRecipes();
    this.getTestimony()
  }

  getRecipes() {
    this.api.getAllRecipe().subscribe((res: any) => {
      this.recipeArray = res.slice(0,6);
      console.log(this.recipeArray);
    });
  }

  getTestimony(){
    this.api.getApprovedTestimony().subscribe((res)=>{
        this.testmonyArray = res
    })
  }
}
