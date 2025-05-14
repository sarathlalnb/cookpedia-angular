import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DownloadListComponent } from './download-list/download-list.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'admin-Dashboard',
  },
  {
    path: 'recipe-list',
    component: RecipeListComponent,
    title: 'recipe-list',
  },
  {
    path: 'user-list',
    component: UserListComponent,
    title: 'user-list',
  },
  {
    path: 'download-list',
    component: DownloadListComponent,
    title: 'download-list',
  },
  {
    path: 'feedback-list',
    component: FeedbackListComponent,
    title: 'feedback-list',
  },
  {
    path: 'recipe/add',
    component: RecipeAddComponent,
    title: 'add-recipe',
  },
  {
    path: 'recipe/:id/edit',
    component: RecipeAddComponent,
    title: 'edit-recipe',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
