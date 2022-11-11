import { ITweetDispatcher, Tweet } from "@hexademo/domain";

class TweetEventsDispatcher implements ITweetDispatcher {
	emitTweetCreated(tweet: Tweet): void {
		const event = new CustomEvent("tweetCreated", {
			detail: tweet,
		});
		document.dispatchEvent(event);
	}
}

export { TweetEventsDispatcher };
