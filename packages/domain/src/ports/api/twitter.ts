import type { Tweet } from "../../types/tweet";

interface ITwitterAPI {
	tweet(message: string): Promise<Tweet>;
	like(tweetId: string): Promise<Tweet>;
	listTweets(): Promise<Array<Tweet>>;
}

export type { ITwitterAPI };
