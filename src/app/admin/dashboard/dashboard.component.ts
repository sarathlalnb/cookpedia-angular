import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private router: Router, private api: ApiService) {}

  selected = new Date();
  Highcharts: typeof Highcharts = Highcharts;
  val: any = localStorage.getItem('chartData');
  chartData: any = JSON.parse(this.val);
  chartOptions: any = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Analysis of Download Recipes based on cuisine',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Total Download recipe count',
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: 'Cuisine',
        colorByPoint: true,
        type: 'bar',
        data: this.chartData,
      },
    ],
  };

  isSideBarOpen: boolean = true;
  dashBoardClass: string = 'col-10';
  userCount: number = 0;
  recipeCount: number = 0;
  downloadCount: number = 0;
  feedbackCount: number = 0;
  userArray: any = [];
  recipeArray: any = [];
  downloadArray: any = [];
  feedbackArray: any = [];
  // downloadArray:any = []

  menuClick() {
    this.isSideBarOpen = !this.isSideBarOpen;
    this.isSideBarOpen
      ? (this.dashBoardClass = 'col-10')
      : (this.dashBoardClass = 'col');
  }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.getDownloadCount();
    this.getUserCount();
    this.getRecipeCount();
    this.getFeedbackCount();
  }

  getUserCount() {
    this.api.getAllUsers().subscribe((res) => {
      this.userArray = res;
      this.userCount = this.userArray.length;
    });
  }

  getRecipeCount() {
    this.api.getAllRecipe().subscribe((res) => {
      this.recipeArray = res;
      this.recipeCount = this.recipeArray.length;
    });
  }

  getDownloadCount() {
    this.api.getAllDownloads().subscribe((res) => {
      this.downloadArray = res;
      console.log(this.downloadArray);
      this.downloadCount = this.downloadArray.length;
      //   this.downloadArray.filter((eachDownload:any)=>{
      //  let name = eachDownload.recipeCuisine
      //  let y = eachDownload.count

      //  let obj = {name,y}
      //  this.chartData.push(obj)

      // })
      // console.log(this.chartData)
    });
  }
  getFeedbackCount() {
    this.api.getFeedBacks().subscribe((res) => {
      this.feedbackArray = res;
      console.log(this.downloadArray);
      this.feedbackCount = this.feedbackArray.length;
    });
  }
}
