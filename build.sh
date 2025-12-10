#!/usr/bin/env bash
# build.sh

# 1. Préparer le Frontend (React)
echo "--- Installation des dépendances Frontend (React) ---"
cd BlogSphere-frontend/
yarn install
yarn dev # Lance la commande de construction (crée le dossier 'build' ou 'dist')
cd ..

# 2. Préparer le Backend (Django)
echo "--- Installation des dépendances Backend (Django) ---"
pip install -r BlogSphere-backend/requirements.txt

# 3. Collecter les Fichiers Statiques (Django)
# Cette étape collecte les fichiers statiques de Django ET le dossier de construction de React.
# Pour cela, vous devez configurer STATICFILES_DIRS dans settings.py pour inclure le chemin React.
echo "--- Collecte des fichiers statiques ---"
python BlogSphere-backend/manage.py collectstatic --no-input