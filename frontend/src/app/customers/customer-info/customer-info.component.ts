import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import { CustomerService } from '../customer.service';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit, OnDestroy {
  private id: string;
  private customerSub: Subscription;
  customer: Customer;
  editing = false;
  editCustomerForm: FormGroup;

  constructor(private customerService: CustomerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.customerSub = this.customerService.getCustomerListener().subscribe(res => {
      this.customer = res.Customer;
      this.editCustomerForm = new FormGroup({
        first_name: new FormControl(this.customer.first_name),
        last_name: new FormControl(this.customer.last_name),
        company_name: new FormControl(this.customer.company_name),
        email: new FormControl(this.customer.email),
        number: new FormControl(this.customer.phone),
        street: new FormControl(this.customer.street),
        city: new FormControl(this.customer.city),
        state: new FormControl(this.customer.state),
        postal: new FormControl(this.customer.postal),
      });
    });
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id);
  }

  onEdit() {
    this.editing = true;
  }

  onCancel() {
    this.editing = false;
  }

  onSave() {

  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }

}
