import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-recipe-component',
  imports: [HeaderComponent,RouterLink],
  templateUrl: './view-recipe-component.component.html',
  styleUrl: './view-recipe-component.component.css',
})
export class ViewRecipeComponentComponent {
  recipeId: string = '';
  recipeData: any = [];
  relatedRecipe:any = []
  constructor(private route: ActivatedRoute, private api: ApiService,private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe((res) => {
      // console.log(res)
      this.recipeId = res['id'];
      console.log(this.recipeId);

      this.getSingleRecipe(this.recipeId);
    });
  }

  getSingleRecipe(recipeId: string) {
    this.api.getSingleRecipe(recipeId).subscribe((res) => {
      console.log(res);
      this.recipeData = res;
      this.getAllRelatedRecipe(this.recipeData.cuisine)
      console.log(this.recipeData);
    });
  }

  getAllRelatedRecipe(cuisine:string){
    this.api.getRelatedRecipe(cuisine).subscribe((res:any)=>{
      if(res.length>0){
        this.relatedRecipe = res.filter((eachRecipe:any)=>eachRecipe.id!=this.recipeData.id)
        console.log(this.relatedRecipe)
      }
      else{
        this.relatedRecipe = []
      }
    
    })
  }

  generatePdf(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipeData.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor('black')
    pdf.text(`Cuisine: ${this.recipeData.cuisine}`,10,20)
    pdf.text(`Serving: ${this.recipeData.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipeData.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipeData.prepTimeMinutes}`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipeData.cookTimeMinutes}`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipeData.caloriesPerServing}`,10,45)
    
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipeData.ingredients,this.recipeData.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save(`${this.recipeData.name}-recipe.pdf`)
  }
  onDownloadClick(){
    this.api.downloadRecipeApi(this.recipeId,this.recipeData).subscribe((res:any)=>{
      console.log(res)
      this.generatePdf()
    })
  }

  onSaveClick(){
    this.api.saveRecipeApi(this.recipeId,this.recipeData).subscribe(({
      next(res:any){
        console.log(res)
        alert("Suucessfully added to saved list")
      },
      error(reason:any){
        alert(reason.error)
      }
    }))
  }

  onRelatedClick(id:any){
    this.router.navigateByUrl(`/viewRecipe/${id}`)
  }
}
