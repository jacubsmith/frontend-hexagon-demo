import { nanoid } from "nanoid";
import { Tweet } from "../../../types/tweet";
import { ITweetAdapter } from "../itweet-adapter";

class TweetInMemAdapter implements ITweetAdapter {
	tweets: Tweet[];

	constructor() {
		this.tweets = [];
	}

	async listTweets(): Promise<Tweet[]> {
		return this.tweets;
	}

	async createTweet(tweet: Tweet): Promise<Tweet> {
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
		this.tweets.push(tweetToCreate);
		return tweetToCreate;
	}

	async likeTweet(tweetId: string): Promise<Tweet> {
		const tweet = this.tweets.find((t) => t.id === tweetId);
		if (!tweet) throw new Error(`Tweet ${tweetId} not found`);

		if (!tweet.likes) {
			tweet.likes = 0;
		}
		tweet.likes += 1;

		return tweet;
	}
}

export { TweetInMemAdapter };
