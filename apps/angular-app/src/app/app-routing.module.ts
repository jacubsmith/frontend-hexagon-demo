import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/signin',
		pathMatch: 'full',
	},
	{
		path: 'signin',
		title: 'signin',
		component: SignInComponent,
	},
	{
		path: 'signup',
		title: 'signup',
		component: SignUpComponent,
	},
	{
		path: 'home',
		title: 'home',
		component: HomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
