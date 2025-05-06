import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server_url = "http://localhost:3000"
// DI
  constructor(private http : HttpClient) { }

   getAllRecipe(){
   return this.http.get(`${this.server_url}/get-allRecipes`)
  } 

  addTestimonyApi(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  registerUser(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)
  }

  loginUser(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }

}
