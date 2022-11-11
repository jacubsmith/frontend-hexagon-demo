import angular, { ILogService } from "angular";
import uiRouter from "@uirouter/angularjs";

import {
	applyPolyfills,
	defineCustomElements,
} from "@hexademo/web-components/loader";

import components from "@/modules/components/components.module";
import domain from "@/modules/domain/domain.module";
import config from "./app.config";
import homeComponent from "./views/home/home.component";
import signInComponent from "./views/signin/signin.component";
import signUpComponent from "./views/signup/signup.component";

angular
	.module("myApp", [uiRouter, domain, components])
	.component(...homeComponent)
	.component(...signInComponent)
	.component(...signUpComponent)
	.config(config)
	.run([
		"$log",
		($log: ILogService) => {
			$log.info("application running");
		},
	]);

applyPolyfills().then(() => {
	defineCustomElements(window, {
		ce: (eventName: string, opts: any) =>
			new CustomEvent(eventName.toLowerCase(), opts),
	} as any);
});
