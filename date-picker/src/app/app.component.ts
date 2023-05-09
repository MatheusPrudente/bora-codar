import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'date-picker';
  months : string[] = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  constructor() {}

  ngAfterViewInit (): void {
    document.querySelector("#main")!.innerHTML = this.render();
    document.querySelector("#header span")!.innerHTML = new Date().getFullYear().toString();
  }

  render() {
    let output = '';
    let classDiv = 'flex items-center justify-center';
    let thisMonth = this.months[new Date().getMonth()];

    for (let month of this.months) {
      const active = thisMonth == month ? 'active' : '';
      output += `<div class='${classDiv} ${active}' >${month}</div>`;
    }

    return output;
  }
}
