import { Component, numberAttribute, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/IProduct';
import { QueueAction } from 'rxjs/internal/scheduler/QueueAction';

@Component({
  selector: 'app-product-layout',
  imports: [],
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.css',
})
export class ProductLayout {
  destinationId: string | null = null;
  _Product = {
    category: 'clothes',
    id: 1,
    images: ['images/tshirt.jpg', 'images/tshirt2.jpg', 'images/tshirt3.jpg'],
    price: 100,
    reviews: [],
    title: 'Generic Tshirt',
    rating: 3,
    details: `
Just like Mickey, you'll be an ''American Original'' in this heavyweight cotton traditional baseball
jersey with red, white and blue styling. Embroidered Mickey as ''Uncle Sam'' and ''250th Independence Day''
appliqués hit a home run on chest and sleeve while screen art on the back and allover pin stripe pattern
celebrate the U.S.A. in style on its big birthday bash.

Magic in the details

.Authentic baseball shirt styling
.Embroidered Mickey Mouse in ''Uncle Sam'' costume appliqué on chest
.Embroidered ''250th Independence Day'' appliqué on left sleeve
.Screen art Mickey Mouse in ''Uncle Sam'' costume and ''American Original'' text on back
.Heavyweight woven fabric
.Allover print pin stripe pattern
.Contrast button front
.Contrast short sleeves with print pin stripes
.Collarless
.Shirttail hem
.Mouse icon ''D'' logo'' ''Established 1928'' woven label at side hem
.Part of the Mickey Mouse Americana Collection
The bare necessities

100% cotton
Imported
Item No. 5205107791017M`,
  };
  Quantity = signal<number>(1);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.destinationId = this.route.snapshot.paramMap.get('id');
  }

  addQuantity() {
    this.Quantity.update((num) => num + 1);
  }

  reduceQuantity() {
    this.Quantity.update((num) => {
      if (num > 0) {
        return num - 1;
      } else return num;
    });
  }
}
