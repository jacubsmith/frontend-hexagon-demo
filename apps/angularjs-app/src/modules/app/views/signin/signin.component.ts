import type { IAccountAPI } from "@hexademo/domain";
import { StateService } from "@uirouter/angularjs";
import { IComponentController, IComponentOptions } from "angular";
import template from "./signin.template.html?raw";

type ISignInController = IComponentController & {
	username: string;
	password: string;
};

class SignInController implements ISignInController {
	username = "";

	password = "";

	constructor(private $state: StateService, private accountAPI: IAccountAPI) {}

	async handleSignEvent(event: Event) {
		const customEvent = event as CustomEvent;
		await this.accountAPI.authenticate(
			customEvent.detail.username,
			customEvent.detail.password
		);

		// eslint-disable-next-line no-param-reassign
		this.$state.go("home");
	}
}

SignInController.$inject = ["$state", "accountAPI"];

const SignInComponent: IComponentOptions = {
	controller: SignInController,
	template,
};

export default ["signInComponent", SignInComponent] as const;
