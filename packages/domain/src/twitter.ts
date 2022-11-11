import { Tweet } from "./types/tweet";
import { ITweetAdapter } from "./ports/spi/itweet-adapter";
import { IAccountAPI, ITwitterAPI } from "./ports/api";
import { ITweetDispatcher } from "./ports/spi/itweet-dispatcher";

class Twitter implements ITwitterAPI {
	accountAPI: IAccountAPI;

	tweetAdapter: ITweetAdapter;

	tweetDispatcher: ITweetDispatcher;

	constructor(
		accountAPI: IAccountAPI,
		tweetAdapter: ITweetAdapter,
		tweetDispatcher: ITweetDispatcher
	) {
		this.accountAPI = accountAPI;
		this.tweetAdapter = tweetAdapter;
		this.tweetDispatcher = tweetDispatcher;
	}

	async listTweets(): Promise<Tweet[]> {
		const tweets = await this.tweetAdapter.listTweets();
		return tweets.reverse();
	}

	async tweet(message: string): Promise<Tweet> {
		this.#checkThatMessageIsFilled(message);
		this.#checkTweetLength(message);

		const author = this.accountAPI.getUsername();
		this.#checkThatAutorIsFilled(author);

		const tweet = await this.tweetAdapter.createTweet({ message, author });
		this.tweetDispatcher.emitTweetCreated(tweet);
		return tweet;
	}

	like(tweetId: string): Promise<Tweet> {
		return this.tweetAdapter.likeTweet(tweetId);
	}

	#checkThatMessageIsFilled(message: string) {
		if (!message.length) {
			throw new Error("Message could not be empty");
		}
	}

	#checkThatAutorIsFilled(author: string) {
		if (!author.length) {
			throw new Error("Author could not be empty");
		}
	}

	#checkTweetLength(message: string) {
		if (message.length > 144) {
			throw new Error("Message length must be lower than 144 characters");
		}
	}
}

export { Twitter };
