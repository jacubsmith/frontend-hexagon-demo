import type { IAccountAPI } from "@hexademo/domain";
import { StateService } from "@uirouter/angularjs";
import { IComponentController, IComponentOptions } from "angular";
import template from "./signup.template.html?raw";

type ISignUpController = IComponentController & {
	username: string;
	password: string;
};

class SignUpController implements ISignUpController {
	username = "";

	password = "";

	constructor(private $state: StateService, private accountAPI: IAccountAPI) {}

	async handleSignEvent(event: Event) {
		const customEvent = event as CustomEvent;
		await this.accountAPI.register(
			customEvent.detail.username,
			customEvent.detail.password
		);
		// eslint-disable-next-line no-param-reassign
		this.$state.go("signin");
	}
}

SignUpController.$inject = ["$state", "accountAPI"];

const SignUpComponent: IComponentOptions = {
	controller: SignUpController,
	template,
};

export default ["signUpComponent", SignUpComponent] as const;
