let worklist = [];

/* Variables */
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filtres");
/* Chercher le tableau de works avec une requête à l'API */
async function getWorks() {
  gallery.innerHTML = "";
  await fetch("http://localhost:5678/api/works")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      worklist = data;
      //cree pour chaque élément du tableau
      data.forEach((work) => {
        createWork(work);
      });
    });
}

/* affichage des works dans le dom */

function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

getWorks(); // Appel de la fonction pour afficher la galerie lorsque la page est chargée

async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}
/*****Création des bouton dynamiquement******/
/*Boucle for pour creer les bouton par catégorie*/
function createAllButtons() {
  getCategory().then((data) => {
    const object = { name: "Tous", id: 0 };
    data.push(object);
    data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    // console.log(data);

    data.forEach((category) => {
      createButton(category);
    });
  });
}
function createButton(category) {
  const btn = document.createElement("button");
  btn.classList.add("buttons-filtres");
  if (0 === category.id) {
    btn.classList.add("active");
  }
  btn.textContent = category.name;
  btn.id = category.id;
  btn.addEventListener("click", () => displayByCategory(category.id));
  containerFiltres.appendChild(btn);
  // console.log(category.id);
  // console.log(category.name);
}

// Trie par classe sur les boutons filtres
async function displayByCategory(categoryId) {
  console.log(categoryId);
  const buttons = document.querySelectorAll(".container-filtres button");
  console.log(buttons);
  buttons.forEach((button) => {
    console.log(button.id);
    if (parseInt(button.id) === categoryId) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  gallery.innerHTML = "";
  worklist.forEach((work) => {
    if (categoryId == work.categoryId) {
      createWork(work);
      // console.log(work);
    }
    if (categoryId == 0) {
      createWork(work);
      // console.log(work);
    }
  });
}
createAllButtons();
//displayByCategory();
