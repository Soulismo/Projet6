let worklist = [];
const token = sessionStorage.getItem("token");
console.log(token);
let categories = [];

/* Variables */
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filtres");

const openModal = function () {
  console.log(".....");
  const modalContainer = document.querySelector(".modalContainer");
  const modal = document.createElement("aside");
  modal.className = "modal";
  modal.addEventListener("click", closeModal);

  const modalWrapper = document.createElement("div");
  modalWrapper.className = "modalWrapper";
  modalWrapper.id = "editGallery";
  modal.appendChild(modalWrapper);
  modalWrapper.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  modalContainer.appendChild(modal);
  generateFirstModalContent();
};
const closeModal = function (e) {
  const modalContainer = document.querySelector(".modalContainer");
  modalContainer.innerHTML = "";
};

const selectCategoryForm = function () {
  const selectCategory = document.querySelector("#selectCategory");
  selectCategory.innerHTML = "";
  categories.map((category) => {
    option = document.createElement("option");
    option.innerHTML = category.name;
    option.value = category.id;
    selectCategory.appendChild(option);
  });
};

function sendNewWork() {
  console.log("ok");
  const title = document.querySelector("#title");
  console.log(title.value);
  const selectCategory = document.querySelector("#selectCategory");
  console.log(selectCategory.value);
  const photo = document.querySelector("#photo");
  console.log(photo.files[0]);

  if (!title.value || !selectCategory.value || !photo.files[0]) {
    return alert("Tous les champs doivent être remplis");
  } else {
    const formData = new FormData();
    formData.append("image", photo.files[0]);
    formData.append("title", title.value);
    formData.append("category", selectCategory.value);
    fetch(`${baseApiUrl}works`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((response) => {
      if (response.ok) {
        getWorks();
        alert("Nouveau fichier envoyé avec succés : " + title.value);
        return response.json();
      } else {
        console.error("Erreur:", response.status);
      }
    });
  }
}
const deleteWork = (id) => {
  console.log(id);
  const url = "http://localhost:5678/api/works/" + id;
  console.log(url);
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      await getWorks();

      generateFirstModalContent();

      alert("Votre image a bien été supprimée");
    }
  });
};
const generateFirstModalContent = () => {
  const modalWrapper = document.querySelector(".modalWrapper");
  modalWrapper.innerHTML = "";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modalHeader";
  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  i.addEventListener("click", closeModal);
  modalHeader.appendChild(i);
  const modalTitle = document.createElement("h3");
  modalTitle.className = "modalTitle";
  modalTitle.innerHTML = "Galerie photo";
  const modalContent = document.createElement("div");
  modalContent.className = "modalContent";
  for (let i = 0; i < worklist.length; i++) {
    const imgContainer = document.createElement("div");
    imgContainer.className = "miniWork";
    const img = document.createElement("img");
    img.className = "modalGalleryImage";
    img.src = worklist[i].imageUrl;
    imgContainer.appendChild(img);
    const trashCan = document.createElement("i");
    trashCan.id = worklist[i].id;
    trashCan.classList.add("fa-solid", "fa-trash-can");
    trashCan.addEventListener("click", () => deleteWork(worklist[i].id));
    imgContainer.appendChild(trashCan);
    modalContent.appendChild(imgContainer);
  }
  const addPictureBtn = document.createElement("button");
  addPictureBtn.id = "addPictureBtn";
  addPictureBtn.innerHTML = "Ajouter une Photo";
  addPictureBtn.addEventListener("click", generateSecondModalContent);

  modalWrapper.appendChild(modalHeader);
  modalWrapper.appendChild(modalTitle);
  modalWrapper.appendChild(modalContent);
  modalWrapper.appendChild(addPictureBtn);
};
const generateSecondModalContent = () => {
  const modalWrapper = document.querySelector(".modalWrapper");
  modalWrapper.innerHTML = "";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modalHeader";
  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";
  i.addEventListener("click", closeModal);
  modalHeader.appendChild(i);
  const arrow = document.createElement("i");
  arrow.id = "fa-arrow-left";
  arrow.className = "fa-solid fa-arrow-left";
  arrow.addEventListener("click", generateFirstModalContent);
  modalHeader.appendChild(arrow);
  const modalTitle = document.createElement("h3");
  modalTitle.className = "modalTitle";
  modalTitle.innerHTML = "Ajouter Photo";
  const modalContent = document.createElement("div");
  modalContent.className = "modalContent";
  const form = document.createElement("form");
  form.id = "addPictureForm";
  form.name = "addPictureForm";

  // Création des éléments du formulaire
  const labelPhoto = document.createElement("div");
  labelPhoto.id = "labelPhoto";
  const pictureImg = document.createElement("img");
  pictureImg.src = "./assets/icons/picture.png";
  pictureImg.id = "picture";
  pictureImg.alt = "choisir une image";
  const browsePicturesLabel = document.createElement("label");
  browsePicturesLabel.setAttribute("for", "photo");
  browsePicturesLabel.className = "browsePictures";
  browsePicturesLabel.textContent = "+ Ajouter photo";
  const paragraph = document.createElement("p");
  paragraph.textContent = "jpg, png : 4mo max";
  const labelPhotoDiv = document.createElement("div");
  labelPhotoDiv.id = "labelPhoto";
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.className = "photo";
  fileInput.name = "photo";
  fileInput.id = "photo";
  fileInput.accept = "image/png, image/jpeg";
  const imagePreview = document.createElement("img");
  imagePreview.src = "#";
  imagePreview.alt = "votre image";
  imagePreview.className = "displayNone";
  labelPhotoDiv.appendChild(imagePreview);

  fileInput.required = true;
  const labelForTitle = document.createElement("label");
  labelForTitle.setAttribute("for", "title");
  labelForTitle.textContent = "Titre";
  const inputTitle = document.createElement("input");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("id", "title");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("required", "");
  const labelCategory = document.createElement("label");
  labelCategory.setAttribute("for", "selectCategory");
  labelCategory.textContent = "Catégorie";
  const selectCategory = document.createElement("select");
  selectCategory.id = "selectCategory";
  selectCategory.name = "selectCategory";

  // Création du bouton submit
  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.className = "valider";
  submitButton.value = "valider";

  // Fonction de validation du formulaire
  const checkFormValidity = () => {
    const title = inputTitle.value.trim();
    const category = selectCategory.value;
    const photoFile = fileInput.files[0];

    if (title && category && photoFile) {
      submitButton.className = "validerActive";
    } else {
      submitButton.className = "valider";
    }
  };

  // Gestionnaires d'événements
  fileInput.onchange = (evt) => {
    const [file] = fileInput.files;
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      ) {
        alert("Le fichier n'est pas du type jpeg ou png");
        fileInput.value = "";
      } else if (file.size > 4000000) {
        alert("La photo est supérieur à 4 mo");
        fileInput.value = "";
      } else {
        imagePreview.src = URL.createObjectURL(file);
        imagePreview.className = "displayBlock addImagePreview";
        pictureImg.className = "displayNone";
        browsePicturesLabel.className = "displayNone";
        paragraph.className = "displayNone";
      }
    }
    checkFormValidity();
  };

  inputTitle.addEventListener("input", checkFormValidity);
  selectCategory.addEventListener("change", checkFormValidity);

  // Gestionnaire de soumission du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendNewWork();
  });

  // Construction de la structure DOM
  modalWrapper.appendChild(modalHeader);
  modalWrapper.appendChild(modalTitle);
  modalWrapper.appendChild(modalContent);
  modalContent.appendChild(form);

  // Ajout des éléments au formulaire
  form.appendChild(labelPhotoDiv);
  labelPhotoDiv.appendChild(pictureImg);
  labelPhotoDiv.appendChild(browsePicturesLabel);
  labelPhotoDiv.appendChild(paragraph);
  labelPhotoDiv.appendChild(fileInput);
  form.appendChild(labelForTitle);
  form.appendChild(inputTitle);
  form.appendChild(labelCategory);
  form.appendChild(selectCategory);
  form.appendChild(submitButton); // Le bouton submit est maintenant dans le form

  selectCategoryForm();
};

if (token) {
  const topMenu = document.createElement("div");
  const editMode = document.createElement("p");
  topMenu.className = "topMenu";
  editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
  body.insertAdjacentElement("afterbegin", topMenu);
  topMenu.append(editMode);

  // edit buttons
  const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;
  document
    .querySelector("#portfolio h2")
    .insertAdjacentHTML("afterend", editBtn);
  document.querySelector("#portfolio p").addEventListener("click", openModal);
}

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
    categories = data;
    if (!token) {
      const object = { name: "Tous", id: 0 };
      data.push(object);
      data.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

      // console.log(data);

      data.forEach((category) => {
        createButton(category);
      });
    }
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
displayByCategory();
