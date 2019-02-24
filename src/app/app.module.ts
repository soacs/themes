import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatCardModule} from '@angular/material';
import {ApploadModule} from './modules/appload/appload.module';

import {AppComponent} from './components/application/app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ApploadModule,
    BrowserAnimationsModule
  ],
  providers: [ApploadModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}


