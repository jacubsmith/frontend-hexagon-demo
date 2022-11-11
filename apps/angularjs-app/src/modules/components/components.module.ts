import angular from "angular";
import createTweet from "./create-tweet/create-tweet.component";
import honkLayout from "./honk-layout/honk-layout.component";

export default angular
	.module("components", [])
	.component(...createTweet)
	.component(...honkLayout).name;
