import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-feedback-list',
  standalone: false,
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css',
})
export class FeedbackListComponent {
  feedBackList: any = [];
  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getFeedback()
  }

  getFeedback() {
    this.api.getFeedBacks().subscribe((res) => {
      this.feedBackList = res;
    });
  }

  updateFeedBack(id:string,status:string){
   let reqBody={
      status
    }
    this.api.updateStatusofFeedback(id,reqBody).subscribe((res)=>{
      console.log(res)
      this.getFeedback()
    })
  }
}
