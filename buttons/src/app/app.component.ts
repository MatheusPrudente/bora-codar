import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buttons';

   loading(event : Event) {
    const button = <HTMLButtonElement> event.currentTarget
    button.classList.add("button-progress");
    const text = button.textContent;
    button.innerHTML = `<i class="ph-circle-notch"></i>${text}`
  }
}
