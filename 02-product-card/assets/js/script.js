const sofas = [
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42404",
    "color" : {
      "name" : "Rosé",
      "hex" : "#774A41"
    },
    "gallery" : [
      "./assets/images/margot_blossom_pink.jpg",
      "./assets/images/margot_blossom_pink_planta.jpg"
    ]
  },
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42405",
    "color" : {
      "name" : "Cinza Escuro",
      "hex" : "#414141"
    },
    "gallery" : [
      "./assets/images/margot_dark_grey.jpg",
      "./assets/images/margot_dark_grey_planta.jpg"
    ]
  },
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42406",
    "color" : {
      "name" : "Verde Floresta",
      "hex" : "#192B1A"
    },
    "gallery" : [
      "./assets/images/margot_forest_green.jpg",
      "./assets/images/margot_forest_green_planta.jpg"
    ]
  },
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42407",
    "color" : {
      "name" : "Verde Musgo",
      "hex" : "#223C3D"
    },
    "gallery" : [
      "./assets/images/margot_moss_green.jpg",
      "./assets/images/margot_moss_green_planta.jpg"
    ]
  },
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42408",
    "color" : {
      "name" : "Azul Marinho",
      "hex" : "#1D2433"
    },
    "gallery" : [
      "./assets/images/margot_nevy_blue.jpg",
      "./assets/images/margot_nevy_blue_planta.jpg"
    ]
  },
  {
    "name" : "Sofá Margot II",
    "price" : "R$ 3.068,05",
    "code" : "42409",
    "color" : {
      "name" : "Amarelo",
      "hex" : "#9E772A"
    },
    "gallery" : [
      "./assets/images/margot_yellow.jpg",
      "./assets/images/margot_yellow_planta.jpg"
    ]
  },
]

function toggle() {
  document.documentElement.classList.toggle("animated")
}

let colorOptions = document.querySelectorAll('.product-details-color');

colorOptions.forEach(option => {
  option.addEventListener('click', (e) => {
    let colorSelected = document.querySelector(".product-details-color-circle-fill.active");
    if (colorSelected) {
      colorSelected.style.boxShadow = '';
      colorSelected.classList.remove("active");
    }

    let element = e.currentTarget || e.target;
    if (element.classList.contains(".product-details-color-circle-fill")) {
      element.classList.add("active");
      newColor.style.boxShadow = '0 0 0 2px #f6f6f4, 0 0 0 4px' + element.getAttribute('data-color');
    } else {
      let newColor = element.querySelector(".product-details-color-circle-fill");
      newColor.classList.add("active");
      newColor.style.boxShadow = '0 0 0 2px #f6f6f4, 0 0 0 4px' + element.getAttribute('data-color');
    }

    const dataCode = element.getAttribute('data-code');
    const selectedSofa = sofas.find(sofa => sofa.code == dataCode);

    const codeSofa = document.getElementById("product-details-code");
    codeSofa.textContent = selectedSofa.code;

    const nameSofa = document.getElementById("product-details-name");
    nameSofa.textContent = selectedSofa.name;

    const colorSofa = document.getElementById("product-details-color");
    colorSofa.textContent = selectedSofa.color.name;

    const priceSofa = document.getElementById("product-details-price");
    priceSofa.textContent = selectedSofa.price;

    const allImages = document.getElementById("product-all-images");
    allImages.innerHTML = '';

    selectedSofa.gallery.forEach((g, index) => {
      let image = document.createElement('img');
      image.src = g;
      image.alt = 'sofa';

      image.addEventListener('click', (e) => {
        let imageSelected = document.querySelector("#product-all-images img.active");
        if (imageSelected) {
          imageSelected.style.boxShadow = '';
          imageSelected.classList.remove("active");
        }

        let element = e.currentTarget || e.target;
        element.classList.add("active");
        element.style.boxShadow = '0 0 0 2px #f6f6f4, 0 0 0 4px #271a45';

        const staticImage = document.getElementById("static");
        staticImage.src = element.src;
      });

      allImages.appendChild(image);

      if(index == 0) {
        image.click();
      }
    });
  });
});

colorOptions[0].click();