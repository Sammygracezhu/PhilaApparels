import { Injectable } from "@angular/core";
import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';
import { Observable } from 'rxjs';

@Injectable()
export class OrderRepository{
    private orders: Order[] = [];
    private loaded: boolean = false;


    constructor(private datasource: RestDataSource){}

    loadOrders(){
        this.loaded = true;
        this.datasource.getOrders()
          .subscribe(orders => this.orders = orders);
    }
    getOrders(): Order[]{
        if(!this.loaded){
            this.loadOrders();
        }
        return this.orders;
    }
    saveOrder(order:Order):Observable<Order>{
        return this.datasource.saveOrder(order);
    }

    updateOrder(order: Order){
        this.datasource.updateOrder(order).subscribe(order=>{
            this.orders.splice(this.orders.findIndex(o=>o.id == order.id), 1, order);
        });
    }

    deleteOrder(id:number){
        this.datasource.deleteOrder(id).subscribe(order=>{
            this.orders.splice(this.orders.findIndex(o=>o.id == id), 1);
        });
    }
}