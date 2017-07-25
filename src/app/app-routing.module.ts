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
    component: HomeComponent,
    name: 'home'
  },
  {
    path: 'support',
    component: SupportComponent,
    name: 'support'
  },
  {
    path: 'product/:code',
    component: ProductComponent,
    name: 'product'
  },
  {
    path: 'example',
    component: ExampleComponent,
    name: 'example'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }



]


@NgModule({
  // ng 默认采用h5风格路由    通过添加{ useHash: true }  设置为hash 路由模式
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }