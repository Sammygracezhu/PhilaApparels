import { Injectable } from "@angular/core";
import { Apparel } from './apparel.model';
import { RestDataSource } from './rest.datasource';
//import { StaticDataSource } from './static.datasource';

@Injectable()
export class ApparelRepository{
    private apparels: Apparel[]=[];
    private categories:string[] = [];
    constructor(private datasource:RestDataSource){
        datasource.getApparels().subscribe(data=>{
            this.apparels = data;
            this.categories = data.map(a=>a.category)
            .filter((c, index, array)=>array.indexOf(c) == index)
            .sort();
        });
    }

    getApparels(category:string = null):Apparel[]{
        return this.apparels
        .filter(a=>category == null || category == a.category);
    }

    getApparel(id:number): Apparel{
        return this.apparels.find(a=>a.id == id);
    }
    
    getCategories():string[]{
        return this.categories;
    }

    saveApparel(apparel: Apparel){
        if(apparel.id == null || apparel.id == 0){
            this.datasource.saveApparel(apparel)
            .subscribe(a=>this.apparels.push(a));
        }else{
            this.datasource.updateApparel(apparel)
            .subscribe(a=>{
                this.apparels.splice(this.apparels.findIndex(a=>a.id ==apparel.id), 1, apparel);
            });
        }
    }

    deleteApparel(id:number){
        this.datasource.deleteApparel(id).subscribe(a=>{
            this.apparels.splice(this.apparels.findIndex(a=>a.id == id), 1);
        })
    }
}