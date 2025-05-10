import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

   recipeArray :any =[]

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getRecipes()
  }

  getRecipes(){
    this.api.getAllRecipe().subscribe((res)=>{
      this.recipeArray = res
    })
  }

}
