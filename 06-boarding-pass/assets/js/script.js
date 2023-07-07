const ticket = document.querySelector("#ticket");
const ticketDate = ticket.querySelector(".ticket-date");
ticketDate.textContent = getCurrentDateFormatted();

ticket.addEventListener("mousemove", (event) => {
  const ticketWidth = ticket.offsetWidth;
  const ticketHeight = ticket.offsetHeight;

  const centerX = ticket.offsetLeft + ticketWidth/2;
  const centerY = ticket.offsetTop + ticketHeight/2;

  const positionX = event.clientX - centerX;
  const positionY = event.clientY - centerY;

  const rotateX = (+1)*25* positionY/(ticketHeight/2);
  const rotateY = (-1)*25* positionX/(ticketWidth/2);

  ticket.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

});

ticket.addEventListener("mouseleave", (event) => {
  ticket.style.transform = `rotateX(0deg) rotateY(0deg)`;
  ticket.style.transition = "transform 300ms";

  setTimeout(() => {
    ticket.style.transition = "";
  },400);
});

ticket.addEventListener("mouseenter", (event) => {
  clearInterval(ticket.transitionId);
  ticket.style.transition = "transform 300ms";

  ticket.transitionId = setTimeout(() => {
    ticket.style.transition = "";
  },400);
});

function getCurrentDateFormatted(){
  var currentDate = new Date(),
  currentDay  = currentDate.getDate().toString(),
  dayFormatted = (currentDay.length == 1) ? '0'+ currentDay : currentDay,
  currentMonth  = (currentDate.getMonth()+1).toString(),
  monthFormatted = (currentMonth.length == 1) ? '0'+ currentMonth : currentMonth,
  yearFormatted = currentDate.getFullYear();
  return dayFormatted + "/" + monthFormatted + "/" + yearFormatted;
}