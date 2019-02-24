import {Component, OnInit} from '@angular/core';
import {APP_SETTINGS} from '../../settings/settings';
import {ApploadService} from '../../modules/appload/services/appload.service';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Firm Themes Demo';
  settings: any;
  currentUrl: string;
  firmId: string;
  theme: string;
  themeUrl: any;
  ngAppClass: string;

  constructor(public appLoadService: ApploadService, public sanitizer: DomSanitizer) {
    console.log('BEGIN: AppComponent.constructor()');
    this.settings = appLoadService.getPreLoadedSettings();
    this.firmId = appLoadService.getFirmId();
    this.theme = appLoadService.getTheme();
    this.themeUrl = appLoadService.getThemeUrl();
    console.log('THEME: ' + this.theme);
    console.log('THEME_URL: ' + this.themeUrl);
    this.ngAppClass = appLoadService.getNgAppClass();
    this.currentUrl = appLoadService.getCurrentURL();
    console.log('EXIT: AppComponent.constructor()');
  }

  ngOnInit() {
  }
}

