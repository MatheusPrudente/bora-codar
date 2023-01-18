import { Product } from './../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html'
})
export class CardProductComponent {
  @Input() product : Product = new Product;
  show3D : boolean = false;

  constructor() {}

  changeView() {
    this.show3D ? this.show3D = false : this.show3D = true;
  }
}
