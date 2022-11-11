import type { Tweet } from "../../types/tweet";

interface ITweetAdapter {
	listTweets(): Promise<Array<Tweet>>;
	createTweet(tweet: Tweet): Promise<Tweet>;
	likeTweet(tweetId: string): Promise<Tweet>;
}

export type { ITweetAdapter };
