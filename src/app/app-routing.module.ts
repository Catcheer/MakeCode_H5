import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { HomeComponent } from './views/home/home.component'
import { SupportComponent } from './views/support/support.component'
import { ProductComponent } from './views/product/product.component'
import { ExampleComponent } from './views/example/example.component'

const routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },



]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }