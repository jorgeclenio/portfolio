import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/components/index';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
