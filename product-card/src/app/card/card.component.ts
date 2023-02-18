import { Component, Input } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product : Product = new Product;
  show3D : boolean = false;

  constructor() {}

  changeView() {
    this.show3D ? this.show3D = false : this.show3D = true;
  }
}
