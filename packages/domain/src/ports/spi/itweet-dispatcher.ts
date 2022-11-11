import type { Tweet } from "../../types/tweet";

interface ITweetDispatcher {
	emitTweetCreated(tweet: Tweet): void;
}

export type { ITweetDispatcher };
