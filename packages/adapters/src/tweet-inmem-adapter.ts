import type { Tweet, ITweetAdapter } from "@hexademo/domain";
import { nanoid } from "nanoid";

class TweetInMemAdapter implements ITweetAdapter {
	constructor() {
		this.tweets = [
			{
				id: "2fFKu1SeDn",
				createdAt: this.formatDate(new Date()),
				author: "josue.emmerich",
				message: "Hi guys!",
				likes: 2,
			},
			{
				id: "bAaMnF_y0F",
				createdAt: this.formatDate(new Date()),
				author: "unicorn",
				message: "I'm a unicorn",
				likes: 15,
			},
			{
				id: "92jFuJDMc9",
				createdAt: this.formatDate(new Date()),
				author: "doe-j",
				message: "Does anyone know my real name?",
				likes: 3,
			},
			{
				id: "H38k2O0A2h",
				createdAt: this.formatDate(new Date()),
				author: "brian.barton",
				message: "A frontend hexagon, really?",
				likes: 1,
			},
		];
	}

	get tweets(): Tweet[] {
		const items = localStorage.getItem("tweets");
		return JSON.parse(items || "[]");
	}

	set tweets(items: Tweet[]) {
		const serialized = JSON.stringify(items);
		localStorage.setItem("tweets", serialized);
	}

	formatDate(date: Date) {
		return new Intl.DateTimeFormat("fr-FR", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}).format(date);
	}

	async listTweets(): Promise<Tweet[]> {
		return [...this.tweets];
	}

	async createTweet(tweet: Tweet): Promise<Tweet> {
		const { tweets } = this;
		const tweetToCreate: Tweet = {
			id: nanoid(10),
			createdAt: new Intl.DateTimeFormat("fr-FR", {
				weekday: "short",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}).format(new Date()),
			likes: 0,
			...tweet,
		};
		tweets.push(tweetToCreate);
		this.tweets = tweets;
		return tweetToCreate;
	}

	async likeTweet(tweetId: string): Promise<Tweet> {
		const { tweets } = this;
		const tweet = tweets.find((t) => t.id === tweetId);
		if (!tweet) throw new Error(`Tweet ${tweetId} not found`);

		if (!tweet.likes) {
			tweet.likes = 0;
		}
		tweet.likes += 1;

		this.tweets = tweets;

		return tweet;
	}
}

export { TweetInMemAdapter };
