# Contributing to CompanyIQ France

Merci de votre intérêt pour contribuer à **CompanyIQ France** ! Vous trouverez ici les bonnes pratiques pour proposer des améliorations, signaler des bogues ou créer des fonctionnalités.

---

## 📂 Structure des fichiers de contribution

* **CONTRIBUTING.md** (cette page) : guide général pour contribuer.
* **.github/ISSUE\_TEMPLATE/** : modèles pour remonter un bug ou suggérer une nouvelle fonctionnalité.
* **.github/PULL\_REQUEST\_TEMPLATE.md** : template pour structurer vos Pull Requests.

---

## 🐛 Signaler un bug

1. Vérifiez qu'il n'existe pas déjà dans [Issues](https://github.com/your-user/companyiq-france/issues).
2. Choisissez le modèle **Bug Report** (`.github/ISSUE_TEMPLATE/bug_report.md`).
3. Remplissez :

   * **Titre** clair et précis
   * **Description** du problème
   * **Étapes pour reproduire**
   * **Comportement attendu** vs **obtenu**
   * **Environnement** (OS, navigateur, version de l'app)
4. Soumettez l'Issue.

---

## 🌟 Proposer une nouvelle fonctionnalité

1. Vérifiez si quelqu'un n'a déjà suggéré cette idée.
2. Ouvrez une Issue en choisissant **Feature Request** (`.github/ISSUE_TEMPLATE/feature_request.md`).
3. Décrivez :

   * **Contexte** et **motivation**
   * **Proposition** de solution ou de design
   * **Critères de succès** (comment valider que la fonctionnalité est terminée)

---

## 🔀 Créer une Pull Request

1. Fork du dépôt et créez une branche `feature/ma-fonctionnalite` ou `fix/mon-bug`.
2. Appliquez vos changements, ajoutez des tests si nécessaire.
3. Assurez-vous que `npm test` passe sans erreurs.
4. Engagez vos changements avec un message clair :

   * `feat: ajouter recherche avancée`
   * `fix: corriger la pagination`
5. Poussez votre branche sur GitHub.
6. Ouvrez une PR contre `dev` (ou `main` si urgent) en utilisant le template :

   ```md
   <!-- .github/PULL_REQUEST_TEMPLATE.md -->
   # Description
   <!-- Décrivez vos changements -->

   # Checklist
   - [ ] Tests mis à jour
   - [ ] Documentation mise à jour
   - [ ] Lint OK
   ```

---

## 🧹 Style et bonnes pratiques

* Respectez **Tailwind v3** dans les nouveaux composants.
* Utilisez **shadcn/ui** et **lucide-react** pour l'UI.
* Organisez vos composants dans `src/components/`.
* Préférez **React Query** pour la gestion des données.

---

Merci de participer ! Toute contribution, grande ou petite, est la bienvenue. 🎉
