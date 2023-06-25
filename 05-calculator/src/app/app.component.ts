import { Component } from '@angular/core';

interface Dictionary<Type> {
  [key: string]: Type;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculator';
  mathematicalFormula : string = "";
  resultMathematicalFormula : string = "";
  symbols: Dictionary<string> = {
    "+" : "+",
    "-" : "-",
    "÷" : "/",
    "," : ".",
    "x" : "*",
    "%" : "%"
  };

  constructor() {}

  insert(caracter : string) {
    if(this.checkRules(caracter)) {
      this.mathematicalFormula = this.mathematicalFormula.concat(caracter);
      this.previousResult();
    }
  }

  remove() {
    if(this.mathematicalFormula.length) {
      this.mathematicalFormula = this.mathematicalFormula.slice(0,-1);
      this.previousResult();
    }
  }

  removeAll() {
    this.mathematicalFormula = "";
    this.resultMathematicalFormula = "";
  }

  previousResult() {
    if (this.mathematicalFormula.length > 0) {
      const formula = this.replaceSymbols(this.mathematicalFormula);
      console.log(formula);
      const result = eval(formula);
      console.log(result);
      const resultString = result.toString().replace(".",",")
      this.resultMathematicalFormula = resultString;
    } else {
      this.removeAll();
    }
  }

  replaceSymbols(formula : string) {
    formula = formula.replaceAll(",",this.symbols[","]);
    formula = formula.replaceAll("÷",this.symbols["÷"])
    formula = formula.replaceAll("x",this.symbols["x"])
    return formula;
  }

  result() {
    this.mathematicalFormula = "";
  }

  checkRules(caracter : string) {
    if (this.symbols[caracter]) {
      if (this.mathematicalFormula.length <= 0) {
        return false;
      }

      if(!this.isNumber(this.mathematicalFormula.at(-1))) {
        return false;
      }

    }

    return true
  }

  isNumber(value: string | undefined) {
     return ((value != null) &&
             (value !== '') &&
             !isNaN(Number(value.toString())));
  }
}
