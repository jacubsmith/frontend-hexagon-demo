import { createApp } from "vue";
import App from "./App.vue";
import { AppLoader } from "@hexademo/loader";
import router from "./router";
import * as injectionKeys from "./injections";
import "@picocss/pico/css/pico.css";
import "@hexademo/style";
import {
	applyPolyfills,
	defineCustomElements,
} from "@hexademo/web-components/loader";

applyPolyfills().then(() => {
	defineCustomElements(window, {
		ce: (eventName: string, opts: any) =>
			new CustomEvent(eventName.toLowerCase(), opts),
	} as any);
});

const twitterInstance = AppLoader.getTwitterInstance();
const accountInstance = AppLoader.getAccountInstance();

const app = createApp(App);
app.provide(injectionKeys.ACCOUNT_API, accountInstance);
app.provide(injectionKeys.TWITTER_API, twitterInstance);

app.use(router);
app.mount("#app");
