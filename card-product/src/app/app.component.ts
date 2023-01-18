import { Component } from '@angular/core';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'card-product';
  //Red // Blue
  product : Product = {id : '42404', type : 'home mobile', name : 'Sofá Margot II - Rosé', color : 'Rosé', price: '4.000', urlImage : '../assets/sofa.png', url3D : '../assets/sofa.gif'};

}
