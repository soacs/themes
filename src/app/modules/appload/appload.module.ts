import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApploadService } from './services/appload.service';

export function getSettings(appLoadService: ApploadService) {
  return () => appLoadService.getSettings();
}

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    ApploadService,
    { provide: APP_INITIALIZER, useFactory: getSettings, deps: [ApploadService], multi: true }
  ],
  declarations: []
})
export class ApploadModule { }








