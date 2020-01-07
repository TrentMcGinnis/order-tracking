import { HttpClient } from '@angular/common/http';
import { OnInit, OnDestroy, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Order } from './order.model';

@Injectable({providedIn: 'root'})
export class OrderService implements OnInit, OnDestroy{
  private orderListener: any = new Subject<[Order]>();
  private resourceUrl = 'http://localhost:3000/api/orders/';

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  getOrderListener() {
    return this.orderListener.asObservable();
  }

  getOrder(id: string) {

  }

  getOrders() {
    this.http.get(this.resourceUrl).subscribe(orders => {
      this.orderListener.next(orders);
    });
  }

  postOrder(order: Order) {

  }

  deleteOrder(id: string) {

  }

  ngOnDestroy() {

  }
}
