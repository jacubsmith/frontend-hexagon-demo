import angular from "angular";
import { AppLoader } from "@hexademo/loader";

const accountAPI = AppLoader.getAccountInstance();
const twitterAPI = AppLoader.getTwitterInstance();

export default angular
	.module("domain", [])
	.constant("accountAPI", accountAPI)
	.constant("twitterAPI", twitterAPI).name;
