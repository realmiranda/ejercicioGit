import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CarListComponent } from './pages/car-list/car-list.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TraducePipe } from './shared/traduce.pipe';
import { AEspacioPipe } from './shared/a-espacio.pipe';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { StarComponent } from './components/star/star.component';
import { RouterModule } from "@angular/router";
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { HomeComponent } from './pages/home/home.component';
import { routes } from "./routes/routes";
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './pages/signup/signup.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PaginatePipe } from './shared/paginate.pipe';
import {UserInterceptor} from "./interceptors/userInterceptor";
import { PaginationComponent } from './components/pagination/pagination.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    TraducePipe,
    AEspacioPipe,
    StarComponent,
    CarDetailsComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    PaginatePipe,
    PaginationComponent,
    ValidationMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [ RouterModule ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
