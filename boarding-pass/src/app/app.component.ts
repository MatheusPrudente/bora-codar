import { query } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boarding-pass';

  constructor () {}

  ticketEffect(event : MouseEvent) {
    const ticket = <HTMLElement> document.querySelector("#ticket");
    const ticketWidth = ticket.offsetWidth;
    const ticketHeight = ticket.offsetHeight;

    const centerX = ticket.offsetLeft + ticketWidth/2;
    const centerY = ticket.offsetTop + ticketHeight/2;

    const positionX = event.clientX - centerX;
    const positionY = event.clientY - centerY;

    const rotateX = (+1) * 20 * positionY / (ticketHeight/2);
    const rotateY = (-1) * 20 * positionX / (ticketWidth/2);

    ticket.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }


  ticketBack() {
    const ticket = <HTMLElement> document.querySelector("#ticket");
    ticket.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg)`;
    this.ticketTransition();
  }

  ticketTransition() {
    /*const ticket = <HTMLBodyElement> document.querySelector("#ticket");
    clearInterval(ticket.transitionId);

    ticket.style.transition = 'transform 400ms';
    ticket.transitionId = setTimeout(() => {
      ticket.style.transition = '';
    },400);*/
  }

  ticketEnter() {
    this.ticketTransition();
  }
}
