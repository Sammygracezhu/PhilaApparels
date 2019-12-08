import { Component } from "@angular/core";
import { ApparelRepository } from '../model/apparel.repository';
import { Apparel } from '../model/apparel.model';

@Component({
    templateUrl:"apparelTable.component.html"
})
export class ApparelTableComponent{
    constructor(private repository: ApparelRepository){}

    getApparels():Apparel[]{
        return this.repository.getApparels();
    }

    deleteApparel(id:number){
        this.repository.deleteApparel(id);
    }
}