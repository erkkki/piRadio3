import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormControl, FormGroup} from '@angular/forms';

import {Subscription} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

import {Station} from '../../core/models/station';
import {RadioApiService} from '../../core/services/radio-api.service';
import {HttpParams} from '@angular/common/http';


@Component({
  selector: 'app-stations-search',
  templateUrl: './stations-search.component.html',
  styleUrls: ['./stations-search.component.scss']
})
export class StationsSearchComponent implements OnInit, OnDestroy {

  stations: Station[];
  subscriptions: Subscription[] = [];
  mediaQueryList: MediaQueryList;
  loading: boolean;

  filterForm = new FormGroup( {
    search: new FormControl(''),
    country: new FormControl(''),
    genre: new FormControl(''),
  });

  constructor(private radioApiService: RadioApiService,
              private route: ActivatedRoute,
              private mediaMatcher: MediaMatcher) {
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
  }

  ngOnInit(): void {
    this.loading = false;
    this.loadFromLocalStorage();

    let formValues = this.filterForm.value;


    this.search(this.getParams(formValues));

    const sub = this.filterForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value) => {
      formValues = this.filterForm.value;
      localStorage.setItem('stationsearchform', JSON.stringify(formValues));
      this.search(this.getParams(formValues));
    });
    this.subscriptions.push(sub);
  }

  private getParams(formValues): object {
    return {
      name: (formValues.search) ? formValues.search : '',
      limit: (formValues.country?.country || formValues.country?.country) ? '' : 100,
      country: (formValues.country?.country) ? formValues.country.country : '',
      tagList: (formValues.genre?.genre) ? formValues.genre.genre : '',
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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

  search(params): void {
    this.loading = true;
    this.radioApiService.getStationsSearch(new HttpParams({ fromObject: params}))
      .subscribe(next => {
        this.stations = next;
        this.loading = false;
      }, error => {
        console.log('Something went wrong in search of stations.');
      });
  }
}
