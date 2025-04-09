document.addEventListener('DOMContentLoaded', function() {

    // --- Mise à jour automatique de l'année dans le footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Fonctionnalité Lightbox (s'active seulement si les éléments existent sur la page) ---
    const modal = document.getElementById('lightbox-modal');

    // Vérifie si on est sur une page qui contient le modal (probablement galerie.html)
    if (modal) {
        const modalImg = document.getElementById('lightbox-image');
        const captionText = document.getElementById('caption');
        const galleryItems = document.querySelectorAll('.gallery-item img'); // Cible les images DANS les .gallery-item
        const closeButton = modal.querySelector('.close-button');

        // Vérifie si les éléments nécessaires existent
        if (modalImg && captionText && closeButton && galleryItems.length > 0) {

            galleryItems.forEach(item => {
                // On met l'écouteur sur l'image elle-même ou sur le conteneur .gallery-item
                const itemContainer = item.closest('.gallery-item');
                if(itemContainer) {
                    itemContainer.addEventListener('click', function() {
                        const imgElement = this.querySelector('img'); // Trouve l'image cliquée à l'intérieur
                        const figcaption = this.querySelector('figcaption');

                        modal.style.display = "block"; // Affiche le modal
                        modalImg.src = imgElement.src; // Définit l'image du modal

                        if (figcaption) {
                            // Combine h3 et p pour la légende
                            let title = figcaption.querySelector('h3')?.innerText || '';
                            let details = figcaption.querySelector('p')?.innerText || '';
                            captionText.innerHTML = `${title}${title && details ? '<br>' : ''}${details}`; // Utilise <br> pour séparer sur mobile si besoin
                        } else {
                            captionText.innerHTML = imgElement.alt; // Sinon, utilise le texte alt
                        }
                    });
                }
            });

            // Fonction pour fermer le modal
            function closeModal() {
                modal.style.display = "none";
            }

            // Fermer en cliquant sur le bouton (X)
            closeButton.addEventListener('click', closeModal);

            // Fermer en cliquant en dehors de l'image (sur le fond noir)
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Fermer avec la touche Échap
            document.addEventListener('keydown', function(event) {
                if (event.key === "Escape" && modal.style.display === "block") {
                    closeModal();
                }
            });

        } else {
             // Pas grave si on n'est pas sur la page galerie, on log juste au cas où
            // console.log("Éléments Lightbox non trouvés sur cette page.");
        }
    } // Fin de if (modal)

    // --- Optionnel: Mise en évidence du lien de navigation actif ---
    //    (Simple version basée sur l'URL)
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Prend le nom du fichier actuel

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        link.classList.remove('active'); // Enlève 'active' de tous
        if (linkPage === currentPage) {
            link.classList.add('active'); // Ajoute 'active' au lien correspondant
        }
    });


}); // Fin de DOMContentLoaded