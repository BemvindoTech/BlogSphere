# BlogSphere

## Modeles 

-  utilisateur(user)
    
    - username
    - email
    - password
    - bio
    - photo_profil

- article
  - title 
  - slug
  - category
  - content
  - author

- like
    - article
    - user
- comment(commenttaire)
  - article
  - author
  - content 
  - created_at

## Fonctionnalités'

- Authentification
  - Inscription / connexion (email, mot de passe)
  - Déconnexion sécurisée
  - Gestion du compte (pseudo, bio, photo de profil)
- Articles
  - Création, édition et suppression d’articles
  - Éditeur riche (React Quill ou TipTap) : titres, paragraphes, images, code, listes,
  citations…
  - Aperçu avant publication
  - Gestion des brouillons
- Interactions
  - Commentaires sur chaque article
  - Like (système de réactions simple)
  - Compteur de vues
- Navigation
  - Page d’accueil avec les derniers articles
  - Filtres par auteur / popularité / date
  - Page de lecture d’un article
  - Profil public avec biographie et liste d’articles publiés



## ma ligne droite

- apres initialisation du projet 
- instalationde django admin : python manage.py createsuperuser
  - ajustement de design et de theme avec jazzmin_ui_tweaks
  - creation d'un super utilisateur
  
- Création un modèle utilisateur et un profil personnalisés
    - creation des modeles
    - logique sur la création d'utilisateur et profile
    - effectuer les migrations 
    - effectuer des test sur Django admin
- ajouter les models restants
  - model ajouté (category,comment,bookmark,notification,post)
  - ajouter les modele dans l'interface admin
  - effectuer les migrations 
  