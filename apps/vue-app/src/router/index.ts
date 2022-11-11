import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignInView from "@/views/SignInView.vue";
import SignUpView from "@/views/SignUpView.vue";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/",
			redirect: "/signin",
		},
		{
			path: "/signin",
			name: "signin",
			component: SignInView,
		},
		{
			path: "/signup",
			name: "signup",
			component: SignUpView,
		},
		{
			path: "/home",
			name: "home",
			component: HomeView,
		},
	],
});

export default router;
