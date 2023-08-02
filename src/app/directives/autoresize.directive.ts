import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoresize]'
})
export class AutoresizeDirective {

  private previousCursorPosition: number = 0;

  constructor(private elementRef: ElementRef) { }

  @HostListener('input')
  onInput(): void {
    this.adjustTextareaHeight();
  }

  @HostListener('keydown.delete')
  onDelete(): void {
    this.adjustTextareaHeight();
  }

  private adjustTextareaHeight(): void {
    const textarea: HTMLTextAreaElement = this.elementRef.nativeElement;
    //textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  @HostListener('blur')
  onBlur(): void {
    this.resetTextareaHeight();
  }

  @HostListener('keydown.enter')
  onEnter(): void {
    this.resetTextareaHeight();
  }

  private resetTextareaHeight(): void {
    const textarea: HTMLTextAreaElement = this.elementRef.nativeElement;
    textarea.style.height = '60px';
    this.previousCursorPosition = textarea.selectionStart;
  }

  @HostListener('focus')
  onFocus(): void {
    const textarea: HTMLTextAreaElement = this.elementRef.nativeElement;
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.setSelectionRange(this.previousCursorPosition, this.previousCursorPosition);
  }


}
