import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { RadioApiService } from '../../core/services/radio-api.service';
import { Station } from '../../core/models/station';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

  stations$: Observable<Station[]>;
  country: string;

  constructor(private route: ActivatedRoute, private radioApiService: RadioApiService) { }

  ngOnInit(): void {
    this.stations$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.country = params.get('country');
        return this.radioApiService.getStationsBy('bycountry', this.country);
      })
    );
  }
}
