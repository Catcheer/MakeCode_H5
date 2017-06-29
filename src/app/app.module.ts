import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
// import { HeaderComponent } from './layout/header.component'
import { HomeComponent } from './views/home/home.component'
import { SupportComponent } from './views/support/support.component'
import { ProductComponent } from './views/product/product.component'
import { ExampleComponent } from './views/example/example.component'
import { WetoastComponent } from './views/layout/wetoast.component'
import { HttpServer } from './http.server'

import { WetoastServer } from './servers/wetoast.server'
import { ProductServer } from './servers/product.server'

// 路由
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [HttpServer, Title, ProductServer, WetoastServer],
  declarations: [
    AppComponent,
    WetoastComponent,
    HomeComponent,
    SupportComponent,
    ProductComponent,
    ExampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
