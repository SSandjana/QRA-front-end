import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class SubscriptionService {
  private _subscriptions: Subscription[] = [];

  constructor() {}

  unsubscribeAll(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private get subscriptions(): Subscription[] {
    return this._subscriptions;
  }

  set add(value: Subscription) {
    this._subscriptions.push(value);
  }
}
