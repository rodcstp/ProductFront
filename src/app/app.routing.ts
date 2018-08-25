import { Routes } from '@angular/router';
import { ListComponent } from './view/product/list/list.component';
import { CreateComponent } from './view/product/create/create.component';

export const appRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: 'form', component: CreateComponent },
    { path: 'form/:id', component: CreateComponent },
    { path: '**', component: ListComponent }
  ];
