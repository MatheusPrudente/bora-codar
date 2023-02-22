import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
  mathematicalFormula : string = "";
  resultMathematicalFormula : string = "";

  constructor() {}

  insert(caracter : string) {
    this.mathematicalFormula = this.mathematicalFormula.concat(caracter);
    this.previousResult();
  }

  remove() {
    if(this.mathematicalFormula.length) {
      this.mathematicalFormula = this.mathematicalFormula.slice(0,-1);
    }
  }

  clearAll() {
    this.mathematicalFormula = "";
    this.resultMathematicalFormula = "";
  }

  previousResult() {
    let formula = this.mathematicalFormula.replace(",",".");
    this.resultMathematicalFormula = eval(formula).toString().replace(".",",");
  }

  result() {
    this.mathematicalFormula = "";
  }
}
