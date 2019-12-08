import { Injectable } from "@angular/core";
import { Apparel } from './apparel.model';


@Injectable()
export class Cart{
    public cartLines: CartLine[] = [];
    public itemCount: number = 0;
    public cartPrice: number = 0;

    addCartLine(apparel: Apparel, quantity: number =1){
        let line = this.cartLines.find(line => line.apparel.id == apparel.id);
        if(line != undefined){
            line.quantity += quantity;
        }else{
            this.cartLines.push(new CartLine(apparel, quantity));
        }

        this.recalculate();
    }

    updateQuantity(apparel: Apparel, quantity:number){
        let line = this.cartLines.find(line=>line.apparel.id == apparel.id);
        if(line != undefined){
            line.quantity = Number(quantity);
        }
        this.recalculate();
    }

    removeLine(id:number){
        let index = this.cartLines.findIndex(line=>line.apparel.id == id);
        this.cartLines.splice(index, 1);
        this.recalculate();
    }

    clear(){
        this.cartLines=[];
        this.itemCount = 0;
        this.cartPrice = 0;
    }

    private recalculate(){
        this.itemCount = 0;
        this.cartPrice = 0;
        this.cartLines.forEach(l=>{
            this.itemCount += l.quantity;
            this.cartPrice +=(l.quantity * l.apparel.price);
        })
    }
}

export class CartLine{
    constructor(public apparel: Apparel,
        public quantity:number){}

   get lineTotal(){
       return this.quantity * this.apparel.price;
   }
}