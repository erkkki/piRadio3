import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

import {Observable, Subscription} from 'rxjs';
import {count, distinctUntilChanged} from 'rxjs/operators';

import {Station} from '../../core/models/station';
import {RadioApiService} from '../../core/services/radio-api.service';
import {HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-stations-search',
  templateUrl: './stations-search.component.html',
  styleUrls: ['./stations-search.component.scss']
})
export class StationsSearchComponent implements OnInit, OnDestroy {

  stations$: Observable<Station[]>;
  subcriptions: Subscription[] = [];

  filterForm = new FormGroup( {
    search: new FormControl(''),
    country: new FormControl(''),
    genre: new FormControl(''),
    order: new FormControl('name'),
  });

  constructor(private radioApiService: RadioApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadFromLocalStorage();

    this.search(this.filterForm.value);

    this.filterForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      const formValues = this.filterForm.value;
      localStorage.setItem('stationsearchform', JSON.stringify(formValues));
      this.search(formValues);
    });
  }

  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  loadFromLocalStorage(): void {
    const country = localStorage.getItem('country');
    if (country !== null) {
      localStorage.removeItem('country');
      const tempForm = this.filterForm.value;
      tempForm.country = { country };
      this.filterForm.patchValue(tempForm);
      localStorage.setItem('stationsearchform', JSON.stringify(tempForm));
      return;
    }

    /** Load last search form values from localstorage */
    const savedForm = JSON.parse(localStorage.getItem('stationsearchform'));

    if (savedForm !== null) {
      try {
        this.filterForm.patchValue(savedForm);
      } catch (e) {
        console.log('Error from loading form values from localstorage or adding them to form.');
      }
    }
  }

  search(formValues): void {
    const params = {
      name: (formValues.search) ? formValues.search : '',
      limit: '200',
      country: (formValues.country.country) ? formValues.country.country : '',
      tag: (formValues.genre.genre) ? formValues.genre.genre : '',
      order: (formValues.order.order) ? formValues.order.order : 'clickcount',
      reverse: 'true',
    };
    this.stations$ = this.radioApiService.getStationsSearch(new HttpParams({ fromObject: params}));
  }
}
