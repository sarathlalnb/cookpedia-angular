import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  standalone: false,
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css',
})
export class DownloadListComponent {
  downloadList: any = [];

  constructor(private api: ApiService) {}

  ngOnInit(){
    this.getDownloadList()
  }

  getDownloadList() {
    this.api.getAllDownloads().subscribe((res) => {
      this.downloadList = res;
    });
  }
}
