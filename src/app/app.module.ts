import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './components/user/user.component';
import { FriendComponent } from './components/friend/friend.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ChatComponent } from './components/chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoresizeDirective } from './directives/autoresize.directive';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpHelpers } from './helpers/http-helpers';
import { TokenInterceptor } from './auth/services/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { Common } from './helpers/common';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FriendComponent,
    ChatComponent,
    AutoresizeDirective,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule
  ],
  providers: [HttpHelpers,
              {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
            CookieService,
            Common],
  bootstrap: [AppComponent]
})
export class AppModule { }
