import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from "./interface/auth.guard";


const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "login", component:LoginComponent},
  { path: "sign-up",component:SignupComponent},
  { path: "profile",component:ProfileComponent, canActivate: [AuthGuard]},
  { path: "logout", component:LogoutComponent},
  { path: "cart",component:CartComponent},
  { path: "account", component:AccountComponent},
  { path: "orders",component:OrdersComponent},
  { path: "products", component:ProductsComponent},
  { path: "**",component:NotFoundComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
