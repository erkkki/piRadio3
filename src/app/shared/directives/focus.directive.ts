import {AfterViewInit, AfterViewChecked, Directive, ElementRef, AfterContentInit} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterViewInit, AfterViewChecked, AfterContentInit{

  /** TODO, seems like nothing works.. or gives errors. */
  constructor(private host: ElementRef) { }

  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    this.host.nativeElement.focus();
  }

  ngAfterViewChecked(): void {

  }
}
