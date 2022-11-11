import type { Tweet, ITweetAdapter } from "@hexademo/domain";
import { nanoid } from "nanoid";
import { openDB, IDBPDatabase, DBSchema } from "idb";

interface TweetsDB extends DBSchema {
	tweets: {
		key: string;
		value: Tweet;
		indexes: { byDate: string };
	};
}

class TweetIndexedDbAdapter implements ITweetAdapter {
	#tweetsDb?: IDBPDatabase<TweetsDB>;

	async #db() {
		if (this.#tweetsDb) {
			return this.#tweetsDb;
		}
		this.#tweetsDb = await openDB("hexademoDB", 1, {
			upgrade(db) {
				// Create a store of objects
				const tweetsStore = db.createObjectStore("tweets", {
					// The 'id' property of the object will be the key.
					keyPath: "id",
				});
				tweetsStore.createIndex("byDate", "createdAt");
			},
		});

		return this.#tweetsDb;
	}

	formatDate(date: Date) {
		return new Intl.DateTimeFormat("fr-FR", {
			weekday: "short",
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}).format(date);
	}

	async listTweets(): Promise<Tweet[]> {
		const tweets = await (await this.#db()).getAllFromIndex("tweets", "byDate");
		return tweets;
	}

	async createTweet(tweet: Tweet): Promise<Tweet> {
		const tweetToCreate: Tweet = {
			id: nanoid(10),
			createdAt: new Intl.DateTimeFormat("fr-FR", {
				weekday: "short",
				year: "numeric",
				month: "short",
				day: "numeric",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			}).format(new Date()),
			likes: 0,
			...tweet,
		};
		const db = await this.#db();
		await db.add("tweets", tweetToCreate);
		return tweetToCreate;
	}

	async likeTweet(tweetId: string): Promise<Tweet> {
		const db = await this.#db();
		const tweet = await db.get("tweets", tweetId);
		if (!tweet) throw new Error(`Tweet ${tweetId} not found`);

		if (!tweet.likes) {
			tweet.likes = 0;
		}
		tweet.likes += 1;

		await db.put("tweets", tweet);
		return tweet;
	}
}

export { TweetIndexedDbAdapter };
