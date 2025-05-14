import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  searchKey:string=""
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

  deleteRecipe(id:string){
    this.api.deleteRecipe(id).subscribe((res)=>{
      alert("Succesffully deleted")
      this.getRecipes()
    })
  }

}
