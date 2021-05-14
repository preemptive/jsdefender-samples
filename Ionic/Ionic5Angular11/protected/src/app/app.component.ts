import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Planets', url: '/folder/Inbox', icon: 'planet' },
    { title: 'Characters', url: '/characters', icon: 'person' },
    { title: 'Movies & Shows', url: '/movies', icon: 'videocam' },
  ];
  constructor() {}
}
