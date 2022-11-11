import { describe, test, beforeAll, expect } from "vitest";
import { Account } from "./account";
import { Twitter } from "./twitter";
import { TweetInMemAdapter } from "./ports/spi/stubs/tweet-inmem-adapter";
import { TweetEventsDispatcher } from "./ports/spi/stubs/tweet-events-dispatcher";
import { AuthenticationInMemAdapter } from "./ports/spi/stubs/authentication-inmem-adapter";
import { SessionInMemAdapter } from "./ports/spi/stubs/session-inmem-adapter";

describe("Twitter domain service", () => {
	let account: Account;
	let twitter: Twitter;
	let tweetEventsDispatcher;
	beforeAll(() => {
		tweetEventsDispatcher = new TweetEventsDispatcher();
		account = new Account(
			new AuthenticationInMemAdapter(),
			new SessionInMemAdapter()
		);
		twitter = new Twitter(
			account,
			new TweetInMemAdapter(),
			tweetEventsDispatcher
		);
	});

	test("should return an empty tweets list", async () => {
		const tweets = await twitter.listTweets();
		expect(tweets).toHaveLength(0);
	});

	test("should throw an error on tweeting with an empty message", async () => {
		await expect(twitter.tweet("")).rejects.toThrow(
			"Message could not be empty"
		);
	});

	test("should throw error if new tweet message is longer than 144 chars", async () => {
		await expect(() => twitter.tweet(new Array(160).join("x"))).rejects.toThrow(
			"Message length must be lower than 144 characters"
		);
	});

	test("should throw error on tweeting without authentication", async () => {
		await expect(() => twitter.tweet("Hello, world!")).rejects.toThrow(
			"Token not found"
		);
	});

	test("should create a new tweet", async () => {
		await account.authenticate("unicorn", "rainbow");
		const tweet = await twitter.tweet("Hello, world !");
		expect(tweet).toHaveProperty("id");
		expect(tweet).toHaveProperty("message", "Hello, world !");
		expect(tweet).toHaveProperty("author", "unicorn");
		expect(tweet).toHaveProperty("likes", 0);
		expect(tweet).toHaveProperty("createdAt");

		expect(tweetEventsDispatcher.events).toEqual([
			{
				type: "tweetCreated",
				tweetId: tweet.id,
			},
		]);
	});

	test("should like a tweet", async () => {
		const tweet = await twitter.tweet("Hi !");
		expect(tweet).toHaveProperty("id");
		expect(tweet).toHaveProperty("likes", 0);

		const updated = await twitter.like(tweet.id as string);
		expect(updated).toHaveProperty("likes", 1);
	});
});
