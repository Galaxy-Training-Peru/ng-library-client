import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/ui/main/shell';
import { config } from './app/framework/config/app.config.server';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
