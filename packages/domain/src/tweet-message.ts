import type { Tweet } from "./types/tweet";

class TweetMessage {
	#tweet: Tweet;

	constructor(author: string, message: string) {
		this.#tweet = {
			author,
			message,
			likes: 0,
		};
	}

	validate() {
		if (this.#tweet.message.length > 144) {
			throw new Error("Message length must be lower than 144 characters");
		}
	}

	get tweet() {
		return { ...this.#tweet };
	}
}
export { TweetMessage };
