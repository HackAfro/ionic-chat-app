import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

@Injectable()
export class PusherProvider {
  constructor() {
    var pusher = new Pusher('3dddad24c242ae9a36ca', {
      cluster: 'eu',
      encrypted: true,
    });
    this.channel = pusher.subscribe('chat');
  }
  channel;

  public init() {
    return this.channel;
  }
}
