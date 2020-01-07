import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { CustomerService } from "../customer.service";

@Component({
  selector: "app-new-customer",
  templateUrl: "./new-customer.component.html",
  styleUrls: ["./new-customer.component.css"]
})
export class NewCustomerComponent implements OnInit {
  newCustomerForm: FormGroup;
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.newCustomerForm = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      company_name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      contactMethod: new FormControl(null),
      street: new FormControl(null),
      city: new FormControl(null),
      state: new FormControl(null),
      postal: new FormControl(null)
    });
  }

  onSave() {
    const formData = this.newCustomerForm.value;
    const customer = {
      _id: null,
      first_name: formData.first_name,
      last_name: formData.last_name,
      company_name: formData.company_name,
      email: formData.email,
      phone: formData.phone,
      contactMethod: formData.contactMethod,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postal: formData.postal,
      userID: null
    };
    this.customerService.postCustomer(customer);
  }
}
