import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpParams } from '@angular/common/http';

import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {RadioApiService} from '../../core/services/radio-api.service';
import {Station} from '../../core/models/station';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  station: Station;
  stationUuid: string;

  constructor(private route: ActivatedRoute, private radioApiService: RadioApiService) { }

  ngOnInit(): void {
    this.stationUuid = this.route.snapshot.paramMap.get('uuid');
    this.radioApiService.getStationsBy('byuuid', this.stationUuid).subscribe(stations => {
      this.station = stations[0];
    });
  }
}
