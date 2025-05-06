import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-contact-component',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './contact-component.component.html',
  styleUrl: './contact-component.component.css',
})
export class ContactComponentComponent {
  testimonyForm: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.testimonyForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9 ]*")]],
    });
  }

  onSubmit() {
    if (this.testimonyForm.valid) {
      const name = this.testimonyForm.value.name;
      const email = this.testimonyForm.value.email;
      const message = this.testimonyForm.value.message;
      // api call
      try {
        this.api
          .addTestimonyApi({ name, email, message })
          .subscribe((res: any) => {
            alert('Thank you for your feedback');
            this.testimonyForm.reset();
          });
      } catch (err) {
        console.error(err);
      }
    } else {
      alert('Invalid Form');
    }
  }
}
