import { Tweet } from "@/types/tweet";
import { ITweetDispatcher } from "../itweet-dispatcher";

class TweetEventsDispatcher implements ITweetDispatcher {
	events;

	constructor() {
		this.events = [];
	}

	emitTweetCreated(tweet: Tweet): void {
		this.events.push({
			type: "tweetCreated",
			tweetId: tweet.id,
		});
	}
}

export { TweetEventsDispatcher };
