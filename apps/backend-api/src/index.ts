import express from "express";
import cors from "cors";
import { TweetService } from "./tweet-service";
import { AuthService } from "./auth-service";
import { insertDemoData } from "./demo-loader";

(async function run() {
	const app = express();
	app.use(cors());
	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: false,
		})
	);

	const authService = new AuthService();
	const tweetService = new TweetService();

	app.post("/signup", (req, res) => {
		const { username, password } = req.body;
		try {
			authService.register(username, password);
			res.status(201).send();
		} catch (error) {
			res.status(400).json({
				error: "User already exists",
			});
		}
	});

	app.post("/signin", (req, res) => {
		const { username, password } = req.body;
		try {
			const token = authService.auth(username, password);
			res.send(token);
		} catch (error) {
			res.status(401).send();
		}
	});

	app.get("/tweets", async (req, res) => {
		const tweets = await tweetService.listTweets();
		res.json(tweets);
	});

	app.post("/tweets", async (req, res) => {
		const { message, author } = req.body;
		const created = await tweetService.createTweet(message, author);
		res.status(201).json(created);
	});

	app.post("/tweets/:tweetId/like-tweet", async (req, res) => {
		const { tweetId } = req.params;
		const created = await tweetService.likeTweet(tweetId);
		res.status(201).json(created);
	});

	await insertDemoData(authService, tweetService);
	app.listen(8080, () => {
		console.log("🚀 server started and available on http://localhost:8080");
	});
})();
