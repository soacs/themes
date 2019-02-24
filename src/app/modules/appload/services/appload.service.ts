import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_SETTINGS} from '../../../settings/settings';
import {environment} from '../../../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import {AppSettings} from '../settings';

@Injectable()
export class ApploadService {
  currentURL: string;
  appSettings: AppSettings;
  firmId = 'default';
  theme: string;
  ngAppClass: string;

  constructor(private httpClient: HttpClient, public sanitizer: DomSanitizer) {
    console.log('BEGIN: ApploadService.constructor()');
    this.currentURL = window.location.href;
    console.log('currentURL = ' + this.currentURL);
    console.log('EXIT: ApploadService.constructor()');
  }

  getSettings(): Promise<any> {
    console.log(`ENTER getSettings()`);
    // map user URL to settings location URL (diferent business has different settings
    // http://angularorange.io/json/settings.json
    const firmId = this.getFirmId(this.currentURL);
    const apiUrl = this.getAPIUrl(firmId);
    console.log(`apiUrl = ` + apiUrl);
    const settingsUrl = this.mapCurrentUrltoSettingsApiUrl(this.currentURL);
    console.log(`Call web service API to get settings...`);
    const promise = this.httpClient.get(settingsUrl)
      .toPromise()
      .then(settings => {
        console.log(`Settings returned from web service API: `, settings);
        this.appSettings = <AppSettings>settings;
        console.log(`typeof: `, typeof settings);
        APP_SETTINGS.firmId = this.appSettings.firmId;
        APP_SETTINGS.ngAppClass = this.appSettings.ngAppClass;
        APP_SETTINGS.theme = this.appSettings.theme;
        console.log(`APP_SETTINGS: `, APP_SETTINGS);
        return settings;
      });
    console.log(`EXIT getSettings() - returning promise`);
    return promise;
  }

  getPreLoadedSettings() {
    console.log(`ENTER getPreLoadedSettings()`);
    console.log(`EXIT getPreLoadedSettings() - returning APP_SETTINGS`);
    return APP_SETTINGS;
  }

  getTheme(): string {
    const theme = APP_SETTINGS.theme;
    console.log(`theme = ${theme}`);
    return theme;
  }

  getThemeUrl(): any {
    const lowerCaseTheme = APP_SETTINGS.theme.toLowerCase();
    const themeFile = `${environment.brandDir}${lowerCaseTheme}.css`;
    console.log(`themeFile = ${themeFile}`);
    const t0 = console.time('sanitizer');
    const themeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(themeFile);
    const t1 = console.timeEnd('sanitizer');
    console.log(`themeUrl = ${themeUrl}`);
    return themeUrl;
  }


  getNgAppClass(): string {
    const ngAppClass = APP_SETTINGS.ngAppClass;
    console.log(`ngAppClass = ${ngAppClass}`);
    return ngAppClass;
  }

  getCurrentURL() {
    console.log(`ENTER getCurrentURL()`);
    console.log(`EXIT getCurrentURL()`);
    return this.currentURL;
  }

  getFirmId(currentUrl?: string) {
    if (currentUrl != null) {
      const indexOfEqual = currentUrl.lastIndexOf('=');
      console.log(`indexOfEqual: ` + indexOfEqual);
      if (indexOfEqual >= 0) {
        this.firmId = currentUrl.substr(indexOfEqual + 1);
      }
      console.log(`firmId: ` + this.firmId);
    }
    return this.firmId;
  }

  getAPIUrl(firmId: string): string {
    // return 'http://angularorange.io/json/settings.json';
    return environment.apiUrl + firmId;
  }

  mapCurrentUrltoSettingsApiUrl(currentUrl: string): string {
    const firmId = this.getFirmId(currentUrl);
    const apiUrl = this.getAPIUrl(firmId);
    return apiUrl;
  }
}
