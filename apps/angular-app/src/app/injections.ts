import { InjectionToken } from '@angular/core';
import { IAccountAPI, ITwitterAPI } from '@hexademo/domain';

const AccountAPI = new InjectionToken<IAccountAPI>('ACCOUNT_API');
const TwitterAPI = new InjectionToken<ITwitterAPI>('TWITTER_API');

export { AccountAPI, TwitterAPI };
