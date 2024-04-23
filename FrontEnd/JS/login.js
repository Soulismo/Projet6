// Constante de l'URL de base de l'API
const baseApiUrl = "http://localhost:5678/api/";
const loginToken = sessionStorage.getItem("token");

//  soumission du formulaire
document.addEventListener("submit", (e) => {
  // Empêche le comportement par défaut de la soumission du formulaire (rechargement de la page)
  e.preventDefault();

  // Récupération des valeurs des champs email et password du formulaire
  let form = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };
  console.log(form);

  // Envoi d'une requête POST à l'endpoint de connexion des utilisateurs de l'API
  fetch(`${baseApiUrl}users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json", //  serveur ou vous acceptez les données au format JSON
      "Content-Type": "application/json", //  serveur ou vous envoyez des données au format JSON
    },
    body: JSON.stringify({
      // Conversion des données du formulaire en format JSON
      email: form.email.value,
      password: form.password.value,
    }),
  }).then((response) => {
    // Traitement de la réponse de la requête
    if (response.status !== 200) {
      // Vérification du code de statut de la réponse
      // Affichage d'une alerte si le code de statut n'est pas 200 (succès)
      alert("Email ou mot de passe erronés");
    } else {
      // Si la réponse est réussie (code de statut 200), traitement des données JSON de la réponse
      response.json().then((data) => {
        // Stockage du token d'authentification dans sessionStorage
        sessionStorage.setItem("token", data.token);

        // Redirection vers la page index.html
        window.location.replace("index.html");
      });
    }
  });
});
console.log("..");
const generateLoginButton = () => {
  console.log("text");
  const authButton = document.querySelector(".authButton");
  if (authButton) {
    authButton.innerHTML = "";
    const a = document.createElement("a");
    a.innerHTML = "login";
    a.href = "login.html";
    authButton.appendChild(a);
  }
};
const generateLogoutButton = () => {
  const authButton = document.querySelector(".authButton");
  if (authButton) {
    authButton.innerHTML = "";
    const a = document.createElement("a");
    a.innerHTML = "logout";
    const logoutUser = () => {
      generateLoginButton();
      sessionStorage.removeItem("token");
      window.location.replace("index.html");
    };
    a.addEventListener("click", logoutUser);
    authButton.appendChild(a);
  }
};
if (loginToken) {
  generateLogoutButton();
} else {
  generateLoginButton();
}
