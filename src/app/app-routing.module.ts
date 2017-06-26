import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// components
import { HomeComponent } from './home/home.component'
import { SupportComponent } from './support/support.component'
import { ProductComponent } from './product/product.component'
import { ExampleComponent } from './example/example.component'

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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
   {
    path: '',
    component: HomeComponent
  },
  

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }