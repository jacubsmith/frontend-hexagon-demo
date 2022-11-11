import { AuthService } from "./auth-service";
import { TweetService } from "./tweet-service";

/**
 * Load demo data
 *
 * @param authService
 * @param tweetService
 */
async function insertDemoData(
	authService: AuthService,
	tweetService: TweetService
) {
	authService.register("doe-j", "test1234");
	authService.register("unicorn", "rainbow");
	authService.register("josue.emmerich", "secret");
	authService.register("brian.barton", "secret");

	const t1 = await tweetService.createTweet("Hi guys!", "josue.emmerich");
	const t2 = await tweetService.createTweet("I'm a unicorn", "unicorn");
	const t3 = await tweetService.createTweet(
		"Does anyone know my real name?",
		"doe-j"
	);
	const t4 = await tweetService.createTweet(
		"A frontend hexagon, really?",
		"brian.barton"
	);

	tweetService.likeTweet(t1.id);
	tweetService.likeTweet(t1.id);
	tweetService.likeTweet(t2.id);
	tweetService.likeTweet(t2.id);
	tweetService.likeTweet(t2.id);
	tweetService.likeTweet(t3.id);
	tweetService.likeTweet(t4.id);
	tweetService.likeTweet(t4.id);
	tweetService.likeTweet(t4.id);
	tweetService.likeTweet(t4.id);
}

export { insertDemoData };
