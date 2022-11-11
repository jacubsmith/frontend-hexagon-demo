import { InjectionKey } from "vue";
import { IAccountAPI, ITwitterAPI } from "@hexademo/domain";

export const ACCOUNT_API: InjectionKey<IAccountAPI> = Symbol("AccountAPI");
export const TWITTER_API: InjectionKey<ITwitterAPI> = Symbol("TwitterAPI");
