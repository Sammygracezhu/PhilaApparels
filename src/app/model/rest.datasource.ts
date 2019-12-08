import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaderResponse, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Apparel } from './apparel.model';
import { Order } from './order.model';
import {map} from 'rxjs/operators';


const PROTOCOL = "http";
const PORT = 3500;


@Injectable()
export class RestDataSource{
    baseUrl: string;
    auth_token:string;

    constructor(private http:HttpClient){
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    getApparels():Observable<Apparel[]>{
        return this.http.get<Apparel[]>(this.baseUrl + "apparels");
    }

    saveOrder(order: Order): Observable<Order>{
        return this.http.post<Order>(this.baseUrl + "orders", order, this.getOptions());
    }

  authenticate(user: string, pass: string): Observable<boolean> {
        return this.http.post<any>(this.baseUrl + "login", {
            name: user, password: pass
        }).pipe(map(response => {
            this.auth_token = response.success ? response.token : null;
            return response.success;
        }));
    } 

    saveApparel(apparel: Apparel): Observable<Apparel>{
        return this.http.post<Apparel>(this.baseUrl + "apparels",
          apparel, this.getOptions());
    }

    updateApparel(apparel): Observable<Apparel>{
        return this.http.put<Apparel>(`${this.baseUrl}apparels/${apparel.id}`,
            apparel, this.getOptions());
    }

    deleteApparel(id:number):Observable<Apparel>{
        return this.http.delete<Apparel>(`${this.baseUrl}apparels/${id}`,
        this.getOptions());
    }

    getOrders():Observable<Order[]>{
        return this.http.get<Order[]>(this.baseUrl + "orders", this.getOptions());
    }

    deleteOrder(id:number):Observable<Order>{
        return this.http.delete<Order>(`${this.baseUrl}orders/${id}`, this.getOptions());
    }

    updateOrder(order:Order):Observable<Order>{
        
        return this.http.put<Order>(`${this.baseUrl}orders/${order.id}`,order,
        this.getOptions());
    }

    private getOptions(){
        return {
            headers: new HttpHeaders({
                "authorization":`Bearer<${this.auth_token}>`
            })
        }
    }
}