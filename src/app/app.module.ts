import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// import { HeaderComponent } from './layout/header.component'
import { HomeComponent } from './home/home.component'
import { SupportComponent } from './support/support.component'
import { ProductComponent } from './product/product.component'
import { ExampleComponent } from './example/example.component'
import { HttpServer } from './http.server'

// 路由
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [HttpServer],
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
