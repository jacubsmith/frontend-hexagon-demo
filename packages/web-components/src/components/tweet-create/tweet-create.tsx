import { Component, Event, EventEmitter, h, State } from '@stencil/core';

@Component({
  tag: 'tweet-create',
  styleUrl: 'tweet-create.css',
  scoped: true,
})
export class TweetCreate {
  @State() message: string;

  @Event({ eventName: 'tweetSubmited' }) tweetSubmited: EventEmitter<string>;

  handleChange(event) {
    this.message = event.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.tweetSubmited.emit(this.message);
    this.message = '';
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="message">
          Message
          <textarea id="message" value={this.message} placeholder="What's happening?" onInput={event => this.handleChange(event)} required></textarea>
        </label>
        <button>Honk 🚀</button>
      </form>
    );
  }
}
