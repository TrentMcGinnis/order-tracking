import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from 'src/interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserInfoComponent } from './auth/user-info/user-info.component';
import { HeaderComponent } from './header/header.component';
import { NewCustomerComponent } from './customers/new-customer/new-customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerInfoComponent } from './customers/customer-info/customer-info.component';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderNewComponent } from './orders/order-new/order-new.component';
import { OrderComponent } from './orders/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NewCustomerComponent,
    LoginComponent,
    SignupComponent,
    UserInfoComponent,
    HeaderComponent,
    DashboardComponent,
    CustomerListComponent,
    CustomerComponent,
    CustomerInfoComponent,
    HomeComponent,
    OrderListComponent,
    OrderNewComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
