import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../services/api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  downloadArray:any=[]
  chartData:any=[]

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      // api call

      this.api.loginUser({ email, password }).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('user', JSON.stringify(res.user));
          this.getDownloadCount()
          this.loginForm.reset();
          console.log(res);
          if (res.user.userType == 'User') {
            this.router.navigateByUrl('/');
          } else {
            this.router.navigateByUrl('/admin')
            // admin panel
          }
        },
        error: (err: any) => {
          alert(err.error);
          console.log(err)
        },
      });
    } else {
      alert('Invalid Form');
    }
  }
    getDownloadCount() {
    this.api.getAllDownloads().subscribe((res) => {
      this.downloadArray = res;
      this.downloadArray.filter((eachDownload:any)=>{
     let name = eachDownload.recipeCuisine
     let y = eachDownload.count

     let obj = {name,y}
     this.chartData.push(obj)
     
    })
     localStorage.setItem('chartData', JSON.stringify(this.chartData));
    });
  }
}
