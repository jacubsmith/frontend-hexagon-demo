import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import type { IAccountAPI, ITwitterAPI, Tweet } from '@hexademo/domain';
import { AccountAPI, TwitterAPI } from '../injections';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	username = '';

	message = '';

	tweets: Tweet[] = [];

	constructor(
		private router: Router,
		@Inject(TwitterAPI) private twitterAPI: ITwitterAPI,
		@Inject(AccountAPI) private accountAPI: IAccountAPI
	) {}

	ngOnInit(): void {
		if (!this.accountAPI.isAuthenticated()) {
			this.router.navigate(['/']);
		} else {
			this.username = this.accountAPI.getUsername();
			this.getTweets();
		}
	}

	async getTweets() {
		this.tweets = await this.twitterAPI.listTweets();
	}

	@HostListener('document:tweetCreated', ['$event'])
	async refresh() {
		await this.getTweets();
	}

	@HostListener('tweetSubmited', ['$event'])
	async create(event: CustomEvent) {
		this.message = event.detail;
		await this.twitterAPI.tweet(this.message);
		this.clearForm();
	}

	@HostListener('tweetLiked', ['$event'])
	async likeTweet(event: any) {
		const tweetId = event.detail as string;
		await this.twitterAPI.like(tweetId);
		await this.getTweets();
	}

	clearForm() {
		this.message = '';
	}

	async logout() {
		await this.accountAPI.logout();
		this.router.navigate(['signin']);
	}
}
