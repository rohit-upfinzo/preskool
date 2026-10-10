# Preskool frontend

React application written in JavaScript and JSX, built with Vite. Uses Mantine for UI, Redux Toolkit for state, and React Router for routing.

## Development

Install dependencies with `npm install`, then run `npm run dev`.

Set `VITE_API_URL` in a local `.env` file to your backend API URL. The API client sends cookies with requests.

## Checks and production build

- `npm run lint` checks JavaScript and JSX with ESLint.
- `npm run build` creates the production bundle in `dist`.
- `npm run preview` serves the production bundle locally.

React components use `.jsx`; services, Redux modules, and Vite configuration use `.js`. The React Compiler is enabled in `vite.config.js`.
