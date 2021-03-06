import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import {FormControl, FormGroup} from '@angular/forms';

import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

import {Station} from '../../core/models/radio.api.interfaces';
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

  constructor(
    private radioApiService: RadioApiService,
    private route: ActivatedRoute,
    private router: Router,
    private mediaMatcher: MediaMatcher
  ) {
    this.mediaQueryList = mediaMatcher.matchMedia('(max-width: 768px)');
    this.loading = false;
  }

  ngOnInit(): void {
    let sub: Subscription;

    this.loadFromLocalStorage();

    sub = this.route.params.subscribe(params => {
      if (params?.country) {
        this.filterForm.reset();
        this.filterForm.patchValue({country: {country: params.country}});
      }
      if (params?.genre) {
        this.filterForm.reset();
        this.filterForm.patchValue({genre: {genre: params.genre}});
      }
    });
    this.subscriptions.push(sub);

    /** Initial search */
    const formValues = this.filterForm.value;
    this.search(this.getParams(formValues));

    this.formChange();
  }

  /** Watch form values to change and start new search */
  private formChange(): void {
    let formValues = this.filterForm.value;
    const sub = this.filterForm.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(() => {
      formValues = this.filterForm.value;
      localStorage.setItem('stationsearchform', JSON.stringify(formValues));
      this.router.navigateByUrl('/stations/search');
      this.search(this.getParams(formValues));
    });
    this.subscriptions.push(sub);
  }

  getParams(formValues): object {
    return {
      name: (formValues.search) ? formValues.search : '',
      limit: (formValues.country?.country || formValues.genre?.genre) ? '' : 100,
      country: (formValues.country?.country) ? formValues.country.country : '',
      tagList: (formValues.genre?.genre) ? formValues.genre.genre : '',
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  loadFromLocalStorage(): void {
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

  filterStations(stations: Station[]): Station[] {
    return stations.filter((station) => {
      return station.lastcheckok;
    });
  }

  search(params): void {
    this.loading = true;
    this.radioApiService.searchStations({params})
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe(next => {
        this.stations = this.filterStations(next);
        this.loading = false;
      }, error => {
        console.log('Something went wrong in search of stations.');
        console.log(error);
      });
  }
}
