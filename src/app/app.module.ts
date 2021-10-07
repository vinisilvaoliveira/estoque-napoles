import { BrowserModule, HammerGestureConfig } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { MainComponent } from './core/main/main.component';
import { BannerComponent } from './core/banner/banner.component';
import { ButtomLegendComponent } from './core/buttom-legend/buttom-legend.component';
import { LightboxComponent } from './shared/lightbox/lightbox.component';
import {LoadingScreenComponent} from './shared/components/loading-screen/loading-screen.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Interceptor} from './shared/guards/interceptor';
import { MenuBottomComponent } from './core/menu-bottom/menu-bottom.component';
import { DataPaymentComponent } from './core/data-payment/data-payment.component';
import { NgwWowModule } from 'ngx-wow';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './dashbord/login/login.component';
import { CustomersListComponent } from './dashbord/customers-list/customers-list.component';
import { CustomersNewComponent } from './dashbord/customers-new/customers-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterLoginComponent } from './dashbord/register-login/register-login.component';
import { DataClientComponent } from './dashbord/data-client/data-client.component';
import {AuthGuard} from './shared/guards/auth-guard';
import {AuthVerifyLogin} from './shared/guards/auth-not-logged-guard';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlideShowComponent } from './core/slide-show/slide-show.component';
import { NgxMaskModule } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { OrdemNumbersPipe } from './shared/ordem-numbers.pipe';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BannerComponent,
    ButtomLegendComponent,
    LightboxComponent,
    LoadingScreenComponent,
    MenuBottomComponent,
    DataPaymentComponent,
    LoginComponent,
    CustomersListComponent,
    CustomersNewComponent,
    RegisterLoginComponent,
    DataClientComponent,
    SlideShowComponent,
    OrdemNumbersPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgwWowModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    AuthGuard,
    AuthVerifyLogin
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
