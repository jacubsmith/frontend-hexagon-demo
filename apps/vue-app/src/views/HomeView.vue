<template>
	<honk-layout>
		<template #nav>
			<ul>
				<li>{{ username }}</li>
				<li>
					<button @click="logout" class="outline">Logout</button>
				</li>
			</ul>
		</template>
		<article>
			<header>
				<CreateTweet />
			</header>
			<tweet-card
				v-for="(tweet, index) in tweets"
				:key="tweet.id"
				:id="`tweet-card-${tweet.id}`"
				:tweet-id="tweet.id"
				:author="tweet.author"
				:message="tweet.message"
				:created-at="tweet.createdAt"
				:likes="tweet.likes"
				@tweetliked="likeTweet(tweet.id, index)"
			></tweet-card>
		</article>
	</honk-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ACCOUNT_API, TWITTER_API } from "@/injections";
import { injectStrict } from "@/utils";
import { IAccountAPI, ITwitterAPI, Tweet } from "@hexademo/domain";
import HonkLayout from "@/components/HonkLayout.vue";
import CreateTweet from "@/components/CreateTweet.vue";

let accountAPI: IAccountAPI;
let twitterAPI: ITwitterAPI;

export default defineComponent({
	data() {
		return {
			message: "",
			username: "",
			tweets: [] as Tweet[],
		};
	},
	methods: {
		async listTweets() {
			this.tweets = await twitterAPI.listTweets();
		},
		async refresh() {
			this.listTweets();
		},
		clearForm() {
			this.message = "";
		},
		async logout() {
			await accountAPI.logout();
			this.$router.push("signin");
		},
		async likeTweet(id = "", index: number) {
			const tweet = await twitterAPI.like(id);
			this.tweets[index].likes = tweet.likes;
		},
	},
	mounted() {
		this.username;
		this.message;
		this.tweets;

		accountAPI = injectStrict(ACCOUNT_API);
		twitterAPI = injectStrict(TWITTER_API);

		if (!accountAPI.isAuthenticated()) {
			this.$router.push("/");
		} else {
			this.username = accountAPI.getUsername();
			this.listTweets();
		}

		document.addEventListener("tweetCreated", this.refresh);
	},
	unmounted() {
		document.removeEventListener("tweetCreated", this.refresh);
	},
	components: { HonkLayout, CreateTweet },
});
</script>
