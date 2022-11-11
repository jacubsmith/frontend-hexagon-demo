import { Component, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'tweet-sign',
  styleUrl: 'tweet-sign.css',
  scoped: true,
})
export class TweetSign {
  @Prop() formTitle: string;

  @Prop() username: string;

  @Prop() password: string;

  @Prop() img: string;

  @Prop() btnLabel: string;

  @Event({ eventName: 'signSubmited' }) signSubmited: EventEmitter<any>;

  handleSubmit(e) {
    e.preventDefault();
    this.signSubmited.emit({
      username: this.username,
      password: this.password,
    });
  }

  handleUserChange(event) {
    this.username = event.target.value;
  }

  handlePassChange(event) {
    this.password = event.target.value;
  }

  render() {
    return (
      <article class="grid">
        <div>
          <h2>{this.formTitle}</h2>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlfor="username">
              Username
              <input type="text" id="username" value={this.username} onInput={event => this.handleUserChange(event)} required />
            </label>
            <label htmlfor="password">
              Password
              <input type="password" id="password" value={this.password} onInput={event => this.handlePassChange(event)} required />
            </label>
            <button class="contrast">{this.btnLabel}</button>
            <slot></slot>
          </form>
        </div>
        <div class="sign-img" style={{ '--honk-bg-img': `url(${this.img})` }}></div>
      </article>
    );
  }
}
