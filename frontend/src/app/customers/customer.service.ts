import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Customer } from './customer.model';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private resourceURL = 'http://localhost:3000/api/customers/';
  private customerListener: any = new Subject<{customers: [Customer]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getCustomerListener() {
    return this.customerListener.asObservable();
  }

  getCustomers() {
    this.http.get(this.resourceURL).subscribe(customers => {
      this.customerListener.next(customers);
    });
  }

  getCustomer(customerID: string) {
    this.http.get(this.resourceURL + customerID).subscribe(customer => {
      this.customerListener.next(customer);
    });
  }

  postCustomer(customer: Customer) {
    this.http.post(this.resourceURL, { customer: customer}).subscribe(res => {
      this.router.navigate(['/customers/list']);
    });
  }

  deleteCustomer(customerID: string) {
    this.http.delete(this.resourceURL + customerID).subscribe(res => {
      this.getCustomers();
    });
  }
}

