const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

document.querySelector("#main").innerHTML = render();
document.querySelector("#header span").innerHTML = new Date().getFullYear().toString();

function render() {
  let output = '';
  let thisMonth = months[new Date().getMonth()];

  for (let month of months) {
    const active = thisMonth == month ? 'active' : '';
    output += `<div class='${active}' >${month}</div>`;
  }

  return output;
}