# katekima-test
## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
=======
# Katekima - Frontend (Vue & TypeScript)

## 📌 Features
✅ **List Table Page**  
- Fetch data from [PokeAPI](https://pokeapi.co/api/v2/berry/)  
- Display data in a table with sorting, pagination, and real-time search  
- "Edit" and "Delete" buttons in the action column  
- Persistent page and search state after refresh  

✅ **Add/Edit Data Page**  
- Uses [FakeStoreAPI](https://fakestoreapi.com/products)  
- Displays form to add new data  
- If editing, pre-fills form with existing data  
- Shows success alert when data is added or updated  

✅ **Detail Page**  
- Dropdown to select and view details of an item  
- "Move" button to display selected detail  
- Uses Skeleton Loading for better UX  

✅ **Additional Features**  
- **Vue Router** for navigation  
- **Pinia (State Management)** to persist data  
- **Multi-language support** (English & Indonesian) using Vue I18n  
- **TailwindCSS** for styling  

---

## ⚙️ Tech Stack
- **Vue.js 3** (Composition API & TypeScript)
- **Pinia** (State Management)
- **Vue Router** (Navigation)
- **TailwindCSS** (Styling)
- **Axios** (API Fetching)
- **Vue I18n** (Multi-language support)

---

## 🚀 Installation & Setup
To run this project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/bionapta/katekima-test.git

# Navigate to project folder
cd katekima-test

# Install dependencies
npm install

# Run development server
npm run dev
