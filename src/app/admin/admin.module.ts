import { RouterModule } from "@angular/router";
import { AuthComponent } from './auth.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ApparelEditorComponent } from './apparelEditor.component';
import { ApparelTableComponent } from './apparelTable.component';
import { OrderTableComponent } from './orderTable.component';

let routing = RouterModule.forChild([
    {path:"auth", component:AuthComponent},
    {
        path:"main", component:AdminComponent,canActivate:[AuthGuard],
        children: [
            {path:"apparels/:mode/:id", component: ApparelEditorComponent},
            {path: "apparels/:mode", component: ApparelEditorComponent},
            {path: "apparels", component: ApparelTableComponent},
            {path:"orders", component: OrderTableComponent},
            {path:"**", redirectTo:"apparels"}
        ]
    },
    {path:"**", redirectTo:"auth"}
]);
@NgModule({
    imports:[CommonModule, FormsModule, routing],
    providers:[AuthGuard],
    declarations:[AuthComponent, AdminComponent,
    ApparelTableComponent, ApparelEditorComponent, OrderTableComponent]
})
export class AdminModule{}