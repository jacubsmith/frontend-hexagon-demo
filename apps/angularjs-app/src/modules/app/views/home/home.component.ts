/* eslint-disable no-param-reassign */
import type { IAccountAPI, ITwitterAPI, Tweet } from "@hexademo/domain";
import { IComponentController, IComponentOptions, IScope } from "angular";
import type { StateService } from "@uirouter/angularjs";
import template from "./home.template.html?raw";

type IHomeController = IComponentController & {
	tweets: Tweet[];
	username: String;
	logout: Function;
};

class HomeController implements IHomeController {
	tweets: Tweet[] = [];

	username = "";

	constructor(
		private $scope: IScope,
		private $state: StateService,
		private twitterAPI: ITwitterAPI,
		private accountAPI: IAccountAPI
	) {}

	async getTweets() {
		const tweets = await this.twitterAPI.listTweets();
		this.$scope.$apply(() => {
			this.tweets = tweets;
		});
	}

	$onInit() {
		if (!this.accountAPI.isAuthenticated()) {
			this.$state.go("signin");
		} else {
			this.username = this.accountAPI.getUsername();
			this.getTweets();
		}

		document.addEventListener("tweetCreated", this.getTweets.bind(this), false);
	}

	logout() {
		this.accountAPI.logout().then(() => {
			this.$state.go("signin");
		});
	}

	async handleTweetLikedEvent(id: string, index: number) {
		const tweet = await this.twitterAPI.like(id);
		this.$scope.$apply(() => {
			this.tweets[index].likes = tweet.likes;
		});
	}
}

HomeController.$inject = ["$scope", "$state", "twitterAPI", "accountAPI"];

const HomeComponent: IComponentOptions = {
	controller: HomeController,
	template,
};

export default ["homeComponent", HomeComponent] as const;
