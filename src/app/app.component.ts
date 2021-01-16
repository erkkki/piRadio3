import {Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {PlayerService} from './core/services/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mediaQueryList: MediaQueryList;

  constructor(private mediaMatcher: MediaMatcher, private player: PlayerService) {
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
  }
}

