import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/framework/config';
import { App } from './app/ui/main/shell';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
