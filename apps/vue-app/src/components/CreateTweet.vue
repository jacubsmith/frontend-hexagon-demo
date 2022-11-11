<template>
	<tweet-create
		:message="data.message"
		@tweetsubmited="methods.onSubmit"
	></tweet-create>
</template>

<script lang="ts">
import { reactive, defineComponent } from "vue";
import "@hexademo/web-components/dist/components/tweet-create";
import { TWITTER_API } from "@/injections";
import { injectStrict } from "@/utils";

type CreateTweetData = {
	message: string;
};

export default defineComponent({
	name: "CreateTweet",
	setup() {
		const twitterAPI = injectStrict(TWITTER_API);
		const data = reactive<CreateTweetData>({ message: "" });

		function clearForm() {
			data.message = "";
		}

		async function onSubmit(event: CustomEvent) {
			data.message = event.detail;
			await twitterAPI.tweet(data.message);
			clearForm();
		}

		return {
			methods: { onSubmit },
			data,
		};
	},
});
</script>
