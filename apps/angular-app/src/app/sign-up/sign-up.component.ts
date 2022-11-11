import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountAPI } from '@hexademo/domain';
import { AccountAPI } from '../injections';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
	username = '';

	password = '';

	constructor(
		private router: Router,
		@Inject(AccountAPI) private accountAPI: IAccountAPI
	) {}

	ngOnInit(): void {}

	clearForm() {
		this.username = '';
		this.password = '';
	}

	@HostListener('signSubmited', ['$event'])
	async onSubmit(event: any) {
		this.username = event.detail.username;
		this.password = event.detail.password;
		await this.accountAPI.register(this.username, this.password);
		this.clearForm();
		this.redirect();
	}

	redirect() {
		this.router.navigate(['home']);
	}
}
