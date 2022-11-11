import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@hexademo/web-components/loader';
import '@picocss/pico/css/pico.css';
import '@hexademo/style';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.error(err));

defineCustomElements(window);
