import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'tweet-card',
  styleUrl: 'tweet-card.css',
  scoped: true,
})
export class TweetCard {
  @Prop() tweetId: string;

  @Prop() author: string;

  @Prop() createdAt: string;

  @Prop() message: string;

  @Prop() likes: string;

  @Event({ eventName: 'tweetLiked' }) tweetLiked: EventEmitter<string>;

  emitTweetLiked = () => this.tweetLiked.emit(this.tweetId);

  render() {
    return (
      <div class="tweet-card">
        <div style={{ display: 'none' }}>
          <slot name="title" />
        </div>
        <div class="tweet-card__author">
          {this.author} - {this.createdAt}
        </div>
        <p>{this.message}</p>
        <button class="tweet-card__like-button outline" onClick={this.emitTweetLiked}>
          {this.likes} ❤️
        </button>
      </div>
    );
  }
}
