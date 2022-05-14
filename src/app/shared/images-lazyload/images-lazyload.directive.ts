import { Directive, ElementRef, Injector } from '@angular/core';
import { ImagesLazyloadService } from './images-lazyload.service';

@Directive({
  selector: '[loading]',
})
export class ImagesLazyloadDirective {
  constructor(
    private injector: Injector,
    private el: ElementRef<HTMLImageElement>
  ) {
    const img = this.el.nativeElement;

    // Nếu browser đã support thuộc tính "loading", chúng ta không cần phải làm gì thêm nữa, hãy để nó làm công việc của nó.
    // Tuy nhiên nếu element không phải là img (nó là background image), thì fallback về intersection observable
    if (
      'loading' in HTMLImageElement.prototype &&
      img.tagName.toLowerCase() === 'img'
    ) {
      console.log(true);
      img.src = img.dataset?.src || '';
      el.nativeElement.setAttribute('loading', 'lazy');
    } else {
      // fallback sử dụng intersection observable API
      console.log(false);
      const lazyService = this.injector.get(ImagesLazyloadService);
      lazyService.observe(img);
    }
  }
}
