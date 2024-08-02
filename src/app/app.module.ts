import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { RecentComponent } from './recent/recent.component';
import { ProductComponent } from './product/product.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ProductComponent,
    HeaderComponent,
    LoginComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
