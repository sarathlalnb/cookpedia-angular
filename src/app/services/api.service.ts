import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = 'http://localhost:3000';

  // DI
  constructor(private http: HttpClient) {}

  getAllRecipe() {
    return this.http.get(`${this.server_url}/get-allRecipes`);
  }

  addTestimonyApi(reqBody: any) {
    return this.http.post(`${this.server_url}/add-testimony`, reqBody);
  }

  registerUser(reqBody: any) {
    return this.http.post(`${this.server_url}/register`, reqBody);
  }

  loginUser(reqBody: any) {
    return this.http.post(`${this.server_url}/login`, reqBody);
  }

  // append token in request header
  appendToken() {
    // create a new variable with httpHeader features
    let headers = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return { headers };
  }

  getSingleRecipe(recipeId: string) {
    return this.http.get(
      `${this.server_url}/SingleRecipe/${recipeId}/view`,
      this.appendToken()
    );
  }

  getRelatedRecipe(cuisine: any) {
    return this.http.get(
      `${this.server_url}/related-recipes?cuisine=${cuisine}`,
      this.appendToken()
    );
  }

  downloadRecipeApi(recipeId: string, downloadRecipe: any) {
    return this.http.post(
      `${this.server_url}/recipe/${recipeId}/download`,
      downloadRecipe,
      this.appendToken()
    );
  }

  saveRecipeApi(recipeId: string, savedContent: any) {
    return this.http.post(
      `${this.server_url}/recipe/${recipeId}/save`,
      savedContent,
      this.appendToken()
    );
  }

  getSavedRecipes() {
    return this.http.get(
      `${this.server_url}/saved-recipes`,
      this.appendToken()
    );
  }

  deleteSavedRecipe(id: string) {
    return this.http.delete(
      `${this.server_url}/delete/${id}/Recipe`,
      this.appendToken()
    );
  }

  getAllUsers(){
    return this.http.get(`${this.server_url}/userlist`,this.appendToken())
  } 

  getAllDownloads(){
    return this.http.get(`${this.server_url}/downloadList`,this.appendToken())
  }

  getFeedBacks(){
    return this.http.get(`${this.server_url}/getFeedbacks`,this.appendToken())
  }

  updateStatusofFeedback(id:string,reqBody:any){
    return this.http.patch(`${this.server_url}/testimony/${id}/update`,reqBody,this.appendToken())
  }

  getApprovedTestimony(){
    return this.http.get(`${this.server_url}/approvedTestimony`)
  }
}
