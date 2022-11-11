import type { Tweet, ITweetAdapter } from "@hexademo/domain";

/**
 * Generate output date
 *
 * @param {Date} date input date
 * @returns {string} output
 */
function formatDate(date: Date): string {
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
class TweetRestAdapter implements ITweetAdapter {
	async listTweets(): Promise<Tweet[]> {
		const response = await fetch("http://localhost:8080/tweets");
		const jsonResp = await response.json();
		const tweets: Array<Tweet> = [];
		for (const tweet of jsonResp) {
			tweets.push({
				id: tweet.id,
				message: tweet.message,
				author: tweet.author,
				createdAt: formatDate(new Date(tweet.created_at)),
				likes: tweet.likes,
			});
		}
		return tweets;
	}

	async createTweet(tweet: Tweet): Promise<Tweet> {
		const response = await fetch("http://localhost:8080/tweets", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: tweet.message,
				author: tweet.author,
			}),
		});

		const jsonResp = await response.json();

		return {
			id: jsonResp.id,
			message: jsonResp.message,
			author: jsonResp.author,
			createdAt: formatDate(new Date(jsonResp.created_at)),
			likes: jsonResp.likes,
		};
	}

	async likeTweet(tweetId: string): Promise<Tweet> {
		const response = await fetch(
			`http://localhost:8080/tweets/${tweetId}/like-tweet`,
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
		const jsonResp = await response.json();
		return {
			id: jsonResp.id,
			message: jsonResp.message,
			author: jsonResp.author,
			createdAt: formatDate(new Date(jsonResp.created_at)),
			likes: jsonResp.likes,
		};
	}
}

export { TweetRestAdapter };
