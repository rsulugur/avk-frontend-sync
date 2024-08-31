import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.route';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchOverlayComponent } from './home/search-results/search-overlay/search-overlay.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    SearchOverlayComponent,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    HeaderComponent,
    LoginComponent,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
