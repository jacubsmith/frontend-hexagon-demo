import {
	AuthenticationInMemAdapter,
	SessionCookieAdapter,
	TweetInMemAdapter,
	// TweetIndexedDbAdapter,
	TweetEventsDispatcher,
} from "@hexademo/adapters";
import { Account, IAccountAPI, Twitter, ITwitterAPI } from "@hexademo/domain";

namespace AppLoader {
	const sessionAdapter = new SessionCookieAdapter();

	const authenticationAdater = new AuthenticationInMemAdapter();

	// const tweetAdapter = new TweetIndexedDbAdapter();
	const tweetAdapter = new TweetInMemAdapter();
	const tweetEventsDispatcher = new TweetEventsDispatcher();

	const account = new Account(authenticationAdater, sessionAdapter);
	const twitter = new Twitter(account, tweetAdapter, tweetEventsDispatcher);

	/**
	 * Return twitter domain instance
	 *
	 * @returns {ITwitterAPI} twitter domain
	 */
	export function getTwitterInstance(): ITwitterAPI {
		return twitter;
	}

	/**
	 * Return account domain instance
	 *
	 * @returns {IAccountAPI} account domain
	 */
	export function getAccountInstance(): IAccountAPI {
		return account;
	}
}

export { AppLoader };
