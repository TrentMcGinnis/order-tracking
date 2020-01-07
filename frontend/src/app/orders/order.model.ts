export interface Order {
  customerID: string;
  products: Array<string>;
  dueDate: Date;
  amount: number;
}
