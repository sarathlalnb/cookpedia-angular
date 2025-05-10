import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RecipeListComponent,
    UserListComponent,
    DownloadListComponent,
    FeedbackListComponent,
    SidebarComponent,
    RecipeAddComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
