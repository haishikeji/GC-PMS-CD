import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAppDisabled]'
})
export class AppDisabledDirective {

  constructor(private el: ElementRef) {
   console.error("自定义之灵",this.isDisabled)
   }

   @Input("appAppDisabled") isDisabled:boolean; 

  // @HostListener('mouseenter') onMouseEnter() {
  //   this.highlight('yellow');
  // }

  // private highlight(color) {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

}
