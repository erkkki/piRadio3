import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../core/services/player.service';

@Component({
  selector: 'app-clappr',
  templateUrl: './clappr.component.html',
  styleUrls: ['./clappr.component.scss']
})
export class ClapprComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.loadPlayer();
  }

}
