import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppLoader } from '@hexademo/loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HonkLayoutComponent } from './honk-layout/honk-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AccountAPI, TwitterAPI } from './injections';

@NgModule({
	declarations: [
		AppComponent,
		HonkLayoutComponent,
		SignInComponent,
		SignUpComponent,
		HomeComponent,
	],
	imports: [BrowserModule, AppRoutingModule],
	providers: [
		{ provide: AccountAPI, useValue: AppLoader.getAccountInstance() },
		{ provide: TwitterAPI, useValue: AppLoader.getTwitterInstance() },
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
