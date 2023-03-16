import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutoRefreshComponent } from './components/auto-refresh/auto-refresh.component';
import { MapComponent } from './components/map/map.component';
import { ImusService } from './services/imus.service';
import { MapService } from './services/map.service';

@NgModule({
  declarations: [AppComponent, MapComponent, AutoRefreshComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [MapService, ImusService],
  bootstrap: [AppComponent],
})
export class AppModule {}
