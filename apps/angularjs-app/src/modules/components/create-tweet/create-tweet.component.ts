import { ITwitterAPI } from "@hexademo/domain";
import { IScope } from "angular";
import template from "./create-tweet.template.html?raw";

/**
 *
 * @param $scope
 * @param twitterAPI
 */
function controller($scope: IScope, twitterAPI: ITwitterAPI) {
	this.clearForm = () => {
		this.message = "";
	};

	this.handleSubmitEvent = async (event: CustomEvent) => {
		await twitterAPI.tweet(event.detail);
		$scope.$apply(() => {
			this.message = event.detail;
			this.clearForm();
		});
	};
}

controller.$inject = ["$scope", "twitterAPI"];

const component = {
	template,
	controller,
};

export default ["createTweet", component] as const;
