import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'chat';

  ngAfterViewInit() {
    const messages = <Element> document.querySelector(".messages")
    messages.lastElementChild?.scrollIntoView()
  }
}
