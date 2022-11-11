<template>
	<honk-layout>
		<tweet-sign
			form-title="Sign in"
			btn-label="Login"
			img="https://source.unsplash.com/uymG7UVPXpI/1000x1200"
			:username="username"
			:password="password"
			@signsubmited="onSubmit"
		>
			<p class="sign-option">
				Don't have an account yet?
				<RouterLink to="/signup">Register now</RouterLink>
			</p>
		</tweet-sign>
	</honk-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ACCOUNT_API } from "@/injections";
import { injectStrict } from "@/utils";
import { IAccountAPI } from "@hexademo/domain";

import honkLayout from "@/components/HonkLayout.vue";

let accountAPI: IAccountAPI;

export default defineComponent({
	components: { honkLayout },
	data() {
		return {
			username: "",
			password: "",
		};
	},
	methods: {
		/**
		 *
		 */
		clearForm() {
			this.username = "";
			this.password = "";
		},
		/**
		 *
		 * @param event
		 */
		async onSubmit(event: any) {
			this.username = event.detail.username;
			this.password = event.detail.password;
			await accountAPI.authenticate(this.username, this.password);
			this.clearForm();
			this.redirect();
		},
		/**
		 *
		 */
		redirect() {
			this.$router.push("home");
		},
	},
	mounted() {
		this.username;
		this.password;
		accountAPI = injectStrict(ACCOUNT_API);
	},
});
</script>
