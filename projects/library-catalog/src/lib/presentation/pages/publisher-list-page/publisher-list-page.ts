import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-publisher-list-page',
  template: `<p>Publishers — coming soon</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublisherListPage {}
