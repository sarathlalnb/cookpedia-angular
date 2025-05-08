import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-component',
  imports: [HeaderComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './recipe-component.component.html',
  styleUrl: './recipe-component.component.css',
})
export class RecipeComponentComponent {
  recipeArray: any = [];
  cuisineArray: any = [];
  dummyMealArray: any = [];
  flatDummyArray: any = [];
  mealArray: any = [];
  dummyArray: any = [];
  p: string | number | undefined;
  searchKey: string = '';

  // di
  constructor(private api: ApiService,private router : Router) {}

  ngOnInit() {
    this.getRecipes();
  }

  viewRecipe(recipeId:any){
    let token = sessionStorage.getItem('token')
    if(token){
this.router.navigateByUrl(`viewRecipe/${recipeId}`)
    }else{
      alert("Please login to view recipe")
    }
  }

  getRecipes() {
    this.api.getAllRecipe().subscribe((res: any) => {
      this.recipeArray = res;
      this.dummyArray = res;
      // console.log(this.recipeArray);

      this.recipeArray.forEach((item: any) => {
        // console.log(item.cuisine)
        !this.cuisineArray.includes(item.cuisine) &&
          this.cuisineArray.push(item.cuisine);
      });
      this.dummyMealArray = this.recipeArray.map(
        (eachRecipe: any) => eachRecipe.mealType
      );
      console.log(this.dummyMealArray.flat(Infinity));
      this.flatDummyArray = this.dummyMealArray.flat(Infinity);
      // console.log(this.cuisineArray);

      this.flatDummyArray.forEach((meal: any) => {
        !this.mealArray.includes(meal) && this.mealArray.push(meal);
      });

      console.log(this.mealArray);
    });
  }

  filterRecipes(key: string, value: string) {
    this.recipeArray = this.dummyArray.filter((recipe: any) =>
      recipe[key].includes(value)
    );
  }
}
