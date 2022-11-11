import { nanoid } from "nanoid";
import { Tweet } from "./model/tweet";

class TweetService {
	tweets: Array<Tweet>;

	constructor() {
		this.tweets = [];
	}

	async listTweets(): Promise<Array<Tweet>> {
		return this.tweets;
	}

	async createTweet(message: string, author: string): Promise<Tweet> {
		const tweet = {
			id: nanoid(10),
			message,
			author,
			likes: 0,
			created_at: new Date().toISOString(),
		};

		this.tweets.push(tweet);
		return tweet;
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

export { TweetService };
