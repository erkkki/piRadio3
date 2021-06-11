import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../core/services/player.service';
import {Station} from '../../core/models/station.interface';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-player-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  mediaQueryList: MediaQueryList;

  constructor(private mediaMatcher: MediaMatcher) { }

  ngOnInit(): void {
    this.mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 500px)');
  }

}
