import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule, Title } from '@angular/platform-browser';


import { AppComponent } from './app.component';
// import { HeaderComponent } from './layout/header.component'
import { HomeComponent } from './views/home/home.component'
import { SupportComponent } from './views/support/support.component'
import { ProductComponent } from './views/product/product.component'
import { ExampleComponent } from './views/example/example.component'
import { HttpServer } from './http.server'

import { ProductServer } from './servers/product.server'

// 路由
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HttpServer, Title, ProductServer],
  declarations: [
    AppComponent,
    // HeaderComponent,
    HomeComponent,
    SupportComponent,
    ProductComponent,
    ExampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
