import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-saved-recipe-component',
  imports: [HeaderComponent],
  templateUrl: './saved-recipe-component.component.html',
  styleUrl: './saved-recipe-component.component.css',
})
export class SavedREcipeComponentComponent {
  savedRecipe: any = [];
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getSavedUserRecipes();
  }

  getSavedUserRecipes() {
    this.api.getSavedRecipes().subscribe((res: any) => {
      console.log(res);
      this.savedRecipe = res;
    });
  }

  deleteSavedRec(id:string){
    this.api.deleteSavedRecipe(id).subscribe((res)=>{
      this.getSavedUserRecipes()
    })
  }
}
