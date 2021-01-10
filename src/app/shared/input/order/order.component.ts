import {Component, forwardRef, OnInit, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrderComponent),
      multi: true
    }
  ]
})
export class OrderComponent implements OnInit, ControlValueAccessor {

  form = new FormGroup({
    order: new FormControl('clickcount'),
  });

  constructor() { }
  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {}
  writeValue(obj: any): void {
    /* set value throws error when empty */
    this.form.patchValue(obj);
  }
}
