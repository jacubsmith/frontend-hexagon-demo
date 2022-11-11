import { StateProvider, UrlService } from "@uirouter/angularjs";
import { IAngularBootstrapConfig, ILocationProvider } from "angular";

/**
 * Config module app angularjs
 *
 * @param $stateProvider
 * @param $urlService
 * @param $locationProvider
 */
function config(
	$stateProvider: StateProvider,
	$urlService: UrlService,
	$locationProvider: ILocationProvider
) {
	$locationProvider.hashPrefix("");

	$stateProvider
		.state("signin", {
			url: "/signin",
			component: "signInComponent",
		})
		.state("signup", {
			url: "/signup",
			component: "signUpComponent",
		})
		.state("home", {
			url: "/home",
			component: "homeComponent",
		});

	$urlService.rules.otherwise("signin");
}

config.$inject = ["$stateProvider", "$urlServiceProvider", "$locationProvider"];

export default config as IAngularBootstrapConfig;
