<div align="center">

# 🗂️ Task Vault

**A clean single-page task manager — Vue 3 + Pinia on a Laravel/Vite shell, with Supabase for auth and data.**

![Vue.js](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

</div>

## ✨ Features

- 🔐 **Authentication** — sign up, sign in, sign out and persistent sessions with Supabase Auth
- ✅ **Task CRUD** — create, edit, complete and delete tasks stored in a Supabase `tasks` table
- 🧭 **SPA routing** — Vue Router with auth-guarded routes and a custom 404 page
- 🗃️ **State management** — Pinia stores for auth and tasks
- 🧩 **Reusable UI kit** — Button, Card, TextInput, Loader, Navbar, TaskForm, TaskItem
- 🧪 **Tested** — component and store tests with Vitest + Vue Test Utils
- 🎨 **Responsive UI** — styled with Tailwind CSS

## 🛠️ Tech Stack

| Layer | Tools |
| --- | --- |
| Frontend | Vue 3, Vue Router, Pinia, Vite |
| Backend / Data | Supabase (Auth + Postgres), Laravel 10 (app shell & asset pipeline) |
| Styling | Tailwind CSS, PostCSS |
| Testing | Vitest, Vue Test Utils, jsdom |

## 📁 Structure

```
resources/js/
  ├── components/    # Reusable UI components
  ├── pages/         # Login, Register, Tasks, NotFound
  ├── router/        # Vue Router config + guards
  ├── stores/        # Pinia: authStore, taskStore
  ├── services/      # Supabase client
  └── __tests__/     # Vitest specs
```

## 🚀 Getting Started

```bash
git clone https://github.com/asadullahchowdhury/task-vault.git
cd task-vault

composer install
npm install

cp .env.example .env
php artisan key:generate
# add your Supabase URL and anon key to .env

npm run dev        # Vite dev server
php artisan serve  # http://127.0.0.1:8000
npm test           # run the test suite
```

## 👤 Author

**Rahat Chowdhury** — Full-Stack Developer
[Portfolio](https://rahat-chowdhury.vercel.app) · [LinkedIn](https://www.linkedin.com/in/chowdhuryrahat) · [GitHub](https://github.com/asadullahchowdhury)
