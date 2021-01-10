import {Component, Input, OnInit} from '@angular/core';

import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-player-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit {

  @Input() playState$: ReplaySubject<boolean>;
  playState: boolean;

  constructor() { }

  ngOnInit(): void {
    this.playState = false;
    this.playState$.subscribe(val => this.playState = val);
  }

  pause(): void {
    this.playState$.next(!this.playState);
  }

}
