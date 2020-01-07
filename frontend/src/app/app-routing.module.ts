import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { UserInfoComponent } from './auth/user-info/user-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderComponent } from './orders/order/order.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: UserInfoComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'customers', component: CustomerComponent, children: [
    { path: 'list', component: CustomerListComponent },
    { path: 'new', component: NewCustomerComponent },
    { path: ':id', component: CustomerInfoComponent }
  ]},
  { path: 'orders', component: OrderComponent, children: [
    { path: 'list', component: OrderListComponent },
    { path: 'new', component: NewCustomerComponent },
    { path: ':id', component: CustomerInfoComponent }
  ]},
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
