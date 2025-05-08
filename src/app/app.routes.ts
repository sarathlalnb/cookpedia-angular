import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { AboutComponentComponent } from './about-component/about-component.component';
import { ContactComponentComponent } from './contact-component/contact-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { RecipeComponentComponent } from './recipe-component/recipe-component.component';
import { ViewRecipeComponentComponent } from './view-recipe-component/view-recipe-component.component';
import { SavedREcipeComponentComponent } from './saved-recipe-component/saved-recipe-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';
import { PnfComponent } from './pnf/pnf.component';

export const routes: Routes = [

  // lazy load admin module

  {
    path:'admin',loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },

  {
    path: '',
    component: HomeComponentComponent,
    title: 'Home',
  },
  {
    path: 'about',
    component: AboutComponentComponent,
    title: 'About',
  },
  {
    path: 'contact',
    component: ContactComponentComponent,
    title: 'Contact ',
  },
  {
    path: 'login',
    component: LoginComponentComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponentComponent,
    title: 'register',
  },
  {
    path: 'allRecipes',
    component: RecipeComponentComponent,
    title: 'recipes',
  },
  {
    path: 'viewRecipe/:id',
    component: ViewRecipeComponentComponent,
    title: 'viewRecipe',
  },
  {
    path: 'savedRecipes',
    component: SavedREcipeComponentComponent,
    title: 'savedRecipe',
  },
  {
    path: 'profile',
    component: ProfileComponentComponent,
    title: 'Profile',
  },
  {
    path: '**',
    component: PnfComponent,
    title: 'page not found',
  },
];
