# Gym Manager

## Project info

**Live site**: https://st086822-beep.github.io/Gym-Manager/

**Note:** This repository contains a minor project submitted to **Renaissance University**.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm install

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Click on the "Code" button and select the "Codespaces" tab to launch a codespace.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

---

## Deploying to GitHub Pages ✅

A GitHub Actions workflow is included at `.github/workflows/deploy.yml` which will build the project and publish the `dist/` output to GitHub Pages automatically when you push to `main` or trigger the workflow manually.

To deploy locally (optional):

```sh
# Build
npm run build

# Preview the built site
npm run preview
```

After the workflow runs, your site will be available at: `https://st086822-beep.github.io/xampp-fixer/` (it may take a minute after the workflow completes).

If you want to use a custom domain, configure it in the repository Pages settings in GitHub and update your DNS records accordingly.
