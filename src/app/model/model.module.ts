import { NgModule } from "@angular/core";
import { StaticDataSource } from './static.datasource';
import { ApparelRepository } from './apparel.repository';
import { Cart } from './cart.model';
import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';

@NgModule({
    imports:[HttpClientModule],
    providers:[ ApparelRepository,
        Cart, Order, OrderRepository,
    {provide: StaticDataSource, useClass:RestDataSource},
     RestDataSource, AuthService]
})
export class ModelModule{}