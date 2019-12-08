import { Component } from "@angular/core";
import { Apparel } from '../model/apparel.model';
import { ApparelRepository } from '../model/apparel.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    templateUrl:"apparelEditor.component.html"
})
export class ApparelEditorComponent{
    editing:boolean = false;
    apparel: Apparel = new Apparel();

    constructor(private repository: ApparelRepository,
        private router: Router,
        activeRoute: ActivatedRoute){
            this.editing = activeRoute.snapshot.params["mode"]=="edit";
            if(this.editing){
                Object.assign(this.apparel,
                     repository.getApparel(activeRoute.snapshot.params["id"]));
            }
        }

    save(form:NgForm){
        this.repository.saveApparel(this.apparel);
        this.router.navigateByUrl("/admin/main/apparels");
    }
}