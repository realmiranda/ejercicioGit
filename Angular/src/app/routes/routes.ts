import {Routes} from "@angular/router";
import {HomeComponent} from "../pages/home/home.component";
import {CarDetailsComponent} from "../pages/car-details/car-details.component";
import {CarListComponent} from "../pages/car-list/car-list.component";
import {SignupComponent} from "../pages/signup/signup.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'car/:id', component: CarDetailsComponent },
  { path: 'list', component: CarListComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
