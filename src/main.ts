import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import {LOCALE_ID} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";

registerLocaleData(localeFr, 'fr-FR');

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ]
}).catch((err) => console.error(err));
