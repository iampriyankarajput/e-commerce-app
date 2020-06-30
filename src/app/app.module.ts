import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './authconfig.interceptor'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./interface/auth.guard";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [ 
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    CartComponent,
    AccountComponent,
    OrdersComponent,
    ProductsComponent,
    NotFoundComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,ReactiveFormsModule, FormsModule
  ],
  providers: [AuthService, AuthGuard,
     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
// Priya@12345