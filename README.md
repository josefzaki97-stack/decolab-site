# 🏠 DECOLAB — Site E-commerce Décoration Intérieure

## 📁 Structure du dossier

```
decolab-site/
├── index.html              ← Page principale (ouvrir dans le navigateur)
├── assets/
│   ├── css/
│   │   └── style.css       ← Tous les styles du site
│   └── js/
│       └── app.js          ← Toute la logique (produits, admin, WhatsApp...)
└── README.md               ← Ce fichier
```

---

## 🚀 Comment lancer le site

### Option 1 — En local (simple)
Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur.

### Option 2 — Hébergement gratuit recommandé

#### 🌐 Netlify (le plus simple, gratuit)
1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier `decolab-site/` sur la zone de dépôt
3. Votre site est en ligne en 30 secondes avec une URL du type `decolab-xyz.netlify.app`

#### 🌐 GitHub Pages (gratuit)
1. Créez un repo GitHub
2. Uploadez les fichiers
3. Activez GitHub Pages dans les paramètres

#### 🌐 Vercel (gratuit)
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez votre dossier
3. Déploiement automatique

---

## 🔐 Accès Admin

- **Bouton** : cliquez sur "Admin" en haut à droite
- **Mot de passe** : `decolab2025`
- Pour changer le mot de passe, modifiez la ligne dans `assets/js/app.js` :
  ```javascript
  const ADMIN_PASS = 'decolab2025';
  ```

---

## 📱 Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 🌍 Bilingue FR/AR | Bascule complète Français ↔ Arabe avec RTL automatique |
| 📱 WhatsApp | Bouton de commande sur chaque produit avec message pré-rempli |
| 🔗 Partage WA | Icône de partage sur les cartes + bouton dans la fenêtre produit |
| 🖼️ Fenêtre produit | Clic sur carte = modal détail avec photo, description, commande |
| 🔐 Admin sécurisé | Mot de passe requis pour accéder au panel admin |
| ➕ Ajout produits | Images, nom FR/AR, description, prix, catégorie, badge |
| 🎬 Animation | Preloader animé + animations d'entrée au scroll |
| 🔍 Recherche | Barre de recherche en temps réel |
| 🏷️ Filtres | Par catégorie, fourchette de prix, tri |
| 💳 Paiement | Badge "Paiement à la livraison" sur chaque produit |

---

## 📞 WhatsApp configuré

Numéro actuel : **+212 691 010 969**
- Modifiable depuis le panel Admin → barre WhatsApp en haut
- Ou directement dans `app.js` ligne : `let waNum = '+212691010969';`

---

## 🎨 Personnalisation rapide

| Élément | Fichier | Ligne |
|---|---|---|
| Couleurs principales | `style.css` | Variables `:root` en haut |
| Mot de passe admin | `app.js` | `const ADMIN_PASS = ...` |
| Numéro WhatsApp | `app.js` | `let waNum = ...` |
| Produits de démo | `app.js` | Tableau `prods = [...]` |
| Nom du site | `index.html` | Balise `<title>` et `.logo` |

---

## ✅ Compatible

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobile (responsive)
- ✅ Tablet
- ✅ RTL (Arabe)
- ✅ Aucune dépendance externe (sauf Google Fonts)

---

*Développé pour DECOLAB — © 2025*
