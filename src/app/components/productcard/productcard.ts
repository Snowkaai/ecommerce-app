import { Component, Input, signal, Signal } from '@angular/core';
import { Product } from '../../Models/IProduct';
import { interval, of, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-productcard',
  imports: [],
  templateUrl: './productcard.html',
  styleUrl: './productcard.css',
})
export class Productcard {
  @Input() product!: Product;
  currentIndex = signal(0);
  isFading = signal(false); // 👈 tracks whether the image is mid-fade

  private hoverSubject = new Subject<boolean>();

  constructor() {
    this.hoverSubject
      .pipe(switchMap((isHovering) => (isHovering ? interval(2000) : of(null))))
      .subscribe((val) => {
        if (val !== null) {
          this.changeImageWithFade(); // 👈 use the new method
        } else {
          this.currentIndex.set(0);
        }
      });
  }

  private changeImageWithFade() {
    this.isFading.set(true); // 1. trigger CSS fade-out (opacity → 0)

    setTimeout(() => {
      // 2. after 300ms (matches CSS transition), swap the image
      this.currentIndex.set((this.currentIndex() + 1) % this.product.images.length);
      this.isFading.set(false); // 3. trigger CSS fade-in (opacity → 1)
    }, 300);
  }

  onMouseEnter() {
    this.hoverSubject.next(true);
  }
  onMouseLeave() {
    this.hoverSubject.next(false);
  }
}
