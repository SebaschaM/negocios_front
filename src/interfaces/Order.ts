// Order : id_order, subtotal, address, total, quantity, purchase_date, description, client_id

// Order_product: idOrder_product, order_id, product_id

export interface Order {
  serial: any;
  subtotal: number;
  address: string;
  total: number;
  quantity: number;
  purchase_date: string;
  description: string;
  user_id: number;
  product_id: number;
  fullname: string;
  email: string;
  productname: string;
}
