import { Component } from "@angular/core";
import { ApparelRepository } from '../model/apparel.repository';
import { Apparel } from '../model/apparel.model';
import { Cart } from '../model/cart.model';
import { Router } from '@angular/router';


@Component({
    selector:"store",
    templateUrl:"store.component.html",
    styleUrls:["store.component.css"]
})
export class StoreComponent{
    public img_loc:string = "assets/images/";
    public img_file_type:string = ".jpeg";
    public selectedCategory = null;

    constructor(private repository: ApparelRepository,
        private cart: Cart,
        private router: Router){}

    get apparels(): Apparel[]{
        return this.repository.getApparels(this.selectedCategory);
    }

    get categories():string[]{
        return this.repository.getCategories();
    }

    changeCategory(newCategory?: string){
        
        this.selectedCategory = newCategory;
        
    }

    addApparelToCart(apparel:Apparel){
      this.cart.addCartLine(apparel);
      this.router.navigateByUrl("/cart");
    }

    changeApparelColor(apparel: Apparel, color:string){
        apparel.color = color;
    }
}
