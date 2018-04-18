import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENTES
import { HomeComponent } from './components/home.component';
import { ErrorComponent } from './components/error.component';
import { ProductsListComponent } from './components/products-list.component';
import { ProductAddComponent } from './components/product-add.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ProductEditComponent } from './components/product-edit.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'products-list', component: ProductsListComponent},
    {path: 'product-add', component: ProductAddComponent},
    {path: 'product-detail/:prod', component: ProductDetailComponent},
    {path: 'product-edit/:prod', component: ProductEditComponent},
    {path: '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);