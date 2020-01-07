import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { CustomerService } from "../customer.service";
import { Customer } from '../customer.model';

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private customerSub: any = Subscription;
  customers;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerSub = this.customerService
      .getCustomerListener()
      .subscribe(res => {
        this.customers = res.Customers;
      });
    this.customerService.getCustomers();
  }

  onDelete(customer: Customer) {
    if (confirm('Are you sure you want to delete ' + customer.first_name + " " + customer.last_name)) {
      this.customerService.deleteCustomer(customer._id);
    }
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }
}
