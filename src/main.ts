import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import {LOCALE_ID} from "@angular/core";
import {CustomTimePicker} from "./app/custom-time-picker";
import {OwlDateTimeIntl} from "@danielmoncada/angular-datetime-picker";

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    //Marche pas .. le time local est tjs en anglais
    {provide: OwlDateTimeIntl, useClass: CustomTimePicker}
  ]
}).catch((err) => console.error(err));
