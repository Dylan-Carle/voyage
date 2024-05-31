(function () {
    console.log("Pays")
    // URL de l'API REST de WordPress
    let categories = 3;
    let url = `https://gftnth00.mywhc.ca/tim33/wp-json/wp/v2/posts?categories=${categories}`;
    let bouton__categorie = document.querySelectorAll(".bouton__categorie");
    for(const bouton of bouton__categorie){
        bouton.addEventListener("click", function(e){
            //faire un split du id du e target pour avoir la categorie
            //e.target.id = e.target.id.split("_")[1];
            console.log(e.target.id.split("_")[1]);

            //changer la valeur de la variable categories
            categories = e.target.id.split("_")[1];
            //changer la valeur de la variable url
            url = `https://gftnth00.mywhc.ca/tim33/wp-json/wp/v2/posts?categories=${categories}`;
            ActualiserURL(url);
        });
    }
    ActualiserURL(url);
    function ActualiserURL(url){
    let indexCarte = 0;
    // Effectuer la requête HTTP en utilisant fetch()
    fetch(url)
      .then(function (response) {
        // Vérifier si la réponse est OK (statut HTTP 200)
        if (!response.ok) {
          throw new Error(
            "La requête a échoué avec le statut " + response.status
          );
        }
  
        // Analyser la réponse JSON
        return response.json();
        console.log(response.json());
      })
      .then(function (data) {
        // La variable "data" contient la réponse JSON
        console.log(data);
        let restapi = document.querySelector(".contenu__restapi");
        // Maintenant, vous pouvez traiter les données comme vous le souhaitez
        // Par exemple, extraire les titres des articles comme dans l'exemple précédent
          restapi.innerHTML = "";
          data.forEach(function (article) {
          indexCarte++;
          let titre = article.title.rendered;
          let contenu = article.content.rendered;
          contenu = contenu.substring(0, 75) + "...";
          console.log(titre);
          let carte = document.createElement("div");
          carte.classList.add("carte");
          carte.classList.add("restapi__carte");
          carte.style.animation = "apparitionCarte 1s ease "+ indexCarte/10 +"s forwards";
              
         carte.innerHTML = `
          <h2>${titre}</h2>
          <p>${contenu}</p>
          <p class="a__restApi"><a href="${article.link}">Lire la suite</a></p>
          `;
         restapi.appendChild(carte);
        });
      })
      .catch(function (error) {
        // Gérer les erreurs
        console.error("Erreur lors de la récupération des données :", error);
      });
    }
  })();