import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css',
})
export class RegisterComponentComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    this.registerForm = fb.group({
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const userName = this.registerForm.value.userName;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      // apiCall
      this.api.registerUser({ userName, password, email }).subscribe({
        next: (res: any) => {
          alert(`Succesfully Registered, welcome ${res.userName} please login`);
          this.router.navigateByUrl('/login');
          this.registerForm.reset();
        },
        error: (reason: any) => {
          alert(reason.error);
          this.registerForm.reset();
        },
      });
    } else {
      alert('Invalid Form');
    }
  }
}
