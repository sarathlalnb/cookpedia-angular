import { Component, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { recipeModel } from './recipeModel';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-add',
  standalone: false,
  templateUrl: './recipe-add.component.html',
  styleUrl: './recipe-add.component.css',
})
export class RecipeAddComponent {
  @Input() id!: string;

  newRecipeArray: recipeModel = {};

  recipeArray: any = [];
  cuisineArray: any = [];
  mealArray: any = [];
  dummyMealArray: any = [];
  flatDummyArray: any = [];

  ingredients: any = [];
  instructions: any = [];
  mealTypeArray: any = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.api.getAllRecipe().subscribe((res: any) => {
      this.recipeArray = res;
      if (this.id) {
        this.newRecipeArray = this.recipeArray.find(
          (eachRecipe: any) => eachRecipe._id == this.id
        );
        this.ingredients = this.newRecipeArray.ingredients;
        this.instructions = this.newRecipeArray.instructions;
        this.mealTypeArray = this.newRecipeArray.mealType;
      }
      // console.log(this.recipeArray);

      this.recipeArray.forEach((item: any) => {
        // console.log(item.cuisine)
        !this.cuisineArray.includes(item.cuisine) &&
          this.cuisineArray.push(item.cuisine);
      });
      this.dummyMealArray = this.recipeArray.map(
        (eachRecipe: any) => eachRecipe.mealType
      );
      this.flatDummyArray = this.dummyMealArray.flat(Infinity);
      // console.log(this.cuisineArray);

      this.flatDummyArray.forEach((meal: any) => {
        !this.mealArray.includes(meal) && this.mealArray.push(meal);
      });

      console.log(this.mealArray);
      console.log(this.cuisineArray);
    });
  }

  addIngredients(input: any) {
    if (input.value) {
      this.ingredients.push(input.value);
      console.log(this.ingredients);
    }
  }
  removeIngredient(item: any) {
    this.ingredients = this.ingredients.filter(
      (eachIn: string) => eachIn != item
    );
  }

  addInstructions(input: any) {
    if (input.value) {
      this.instructions.push(input.value);
      console.log(this.instructions);
    }
  }
  removeInstructions(item: any) {
    this.instructions = this.instructions.filter(
      (eachIn: string) => eachIn != item
    );
  }

  mealTypeCheck(event: any) {
    if (event.target.checked) {
      //true
      this.mealTypeArray.push(event.target.name);
    } else {
      //false
      this.mealTypeArray = this.mealTypeArray.filter(
        (eachMeal: any) => eachMeal != event.target.name
      );
    }
    console.log(this.mealTypeArray);
  }

  addRecipe() {
    this.newRecipeArray.ingredients = this.ingredients;
    this.newRecipeArray.instructions = this.instructions;
    this.newRecipeArray.mealType = this.mealTypeArray;

    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.newRecipeArray;

    if (
      name &&
      ingredients &&
      instructions &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType
    ) {
      // api call

      this.api.addRecipeApi(this.newRecipeArray).subscribe({
        next: (res) => {
          alert('successfully added new recipe');
          this.router.navigateByUrl('/admin/recipe-list');
        },
        error: (reason: any) => {
          alert(reason.error);
        },
      });
    } else {
      alert('Please fill the form');
    }

    console.log(this.newRecipeArray);
  }

  removeMealItem(meal: any) {
    this.mealTypeArray = this.mealTypeArray.filter(
      (item: string) => item != meal
    );
  }

  editRecipe() {
    this.newRecipeArray.ingredients = this.ingredients;
    this.newRecipeArray.instructions = this.instructions;
    this.newRecipeArray.mealType = this.mealTypeArray;

    const {
      name,
      ingredients,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      image,
      mealType,
    } = this.newRecipeArray;

    if (
      name &&
      ingredients &&
      instructions &&
      prepTimeMinutes &&
      cookTimeMinutes &&
      servings &&
      difficulty &&
      cuisine &&
      caloriesPerServing &&
      image &&
      mealType
    ) {
      // api call

      this.api.updateRecipe(this.id, this.newRecipeArray).subscribe({
        next: (res) => {
          alert('successfully Updated new recipe');
          this.router.navigateByUrl('/admin/recipe-list');
        },
        error: (reason: any) => {
          alert(reason.error);
        },
      });
    } else {
      alert('Please fill the form');
    }
  }
}
