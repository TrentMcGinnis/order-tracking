import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { OrderService } from "../order.service";
import { CustomerService } from "src/app/customers/customer.service";
import { Order } from '../order.model';

@Component({
  selector: "app-order-list",
  templateUrl: "./order-list.component.html",
  styleUrls: ["./order-list.component.css"]
})
export class OrderListComponent implements OnInit, OnDestroy {
  private orderSub: Subscription;
  orders;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.orderSub = this.orderService.getOrderListener().subscribe(res => {
      this.orders = res.Orders;
    console.log(this.orders)
    });
    this.orderService.getOrders();
  }

  onDelete(order: Order) {

  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }
}

