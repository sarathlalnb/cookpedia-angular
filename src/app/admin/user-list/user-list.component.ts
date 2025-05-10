import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  userList: any = [];
index: any;

  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getUserList()
  }

  getUserList() {
    this.api.getAllUsers().subscribe((res) => {
      this.userList = res;
    });
  }
}
