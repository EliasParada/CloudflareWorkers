# Tutorial how to use Cloudflare Workers and Subdomain to add a login page

## To start we need to create 2 projects, first a main project, with all features we had, the second one is a login API REST projec that get a token to validate the login

## Requirements:

- Node.js
- A paid domain in Cludflare

## Initialize projects with SvelteKit:

First, in yhe `./` directory create a `main/` diretory to init a Svelte Kit project.

```
mkdir main
cd main/
npx sv create
npm install -D @sveltejs/adapter-cloudflare
```