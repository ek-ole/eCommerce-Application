# <h1 align="center">🖼️ PosterShop</h1>

## 📝 Description

**PosterShop** is a single-page e-commerce application for selling designer posters, powered by [Commercetools](https://commercetools.com) and developed as a final project for the RS School online educational platform (course JS/Front-end 2024Q4).

[![Netlify Status](https://api.netlify.com/api/v1/badges/06fffc02-3668-42fb-b60c-8284e8516c98/deploy-status)](https://app.netlify.com/sites/poster-store/deploys)

[![React](https://img.shields.io/badge/React-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-953DD6?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-white?logo=tailwindcss)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-white?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48bGluZSB4MT0iMjA4IiB5MT0iMTI4IiB4Mj0iMTI4IiB5Mj0iMjA4IiBzdHJva2U9ImJsYWNrIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMzIiLz48bGluZSB4MT0iMTkyIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjE5MiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMyIi8+PC9zdmc+)](https://ui.shadcn.com/)
[![Zustand](https://img.shields.io/badge/Zustand-443E38?logo=react)](https://zustand-demo.pmnd.rs/)

[![Prettier](https://img.shields.io/badge/Prettier-BD89C0?logo=prettier&logoColor=white)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Husky](https://img.shields.io/badge/Husky-000000?logo=github)](https://www.npmjs.com/package/husky)
[![SWR](https://img.shields.io/badge/SWR-000000?logo=swr&logoWidth=40&label)](https://swr.vercel.app/ru)
[![Valibot](https://img.shields.io/badge/Valibot-111827?logoColor=white)](https://valibot.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-white?logo=vitest)](https://vitest.dev/)

This application provides the following features:

- Browse poster catalog: View a wide selection of posters available for purchase.

- Filter by category: Easily filter posters by categories to find what you're looking for.

- Add to cart: Add your favorite posters to the cart for checkout.

- Place orders: Complete the order process and make purchases.

- User authentication via SDK: Users can sign in securely using SDK for authentication.

## 💻⚙️ Install and Run the Application

- Using terminal to go to the directory in which you want to install the application, for example:

  ```bash
  cd C/Users/yourname/apps
  ```

- Clone the repository from GitHub:

  ```bash
  git clone https://github.com/Mxmmsv/eCommerce-Application.git
  ```

- Go to the project directory:

  ```bash
  cd eCommerce-Application
  ```

- Install the dependencies with `npm i`:

  ```bash
  npm i
  ```

- Create a `.env` file in the root directory of the project. You can use the provided `.env.example` as a template:

  ```bash
  cp .env.example .env
  ```

- Open the `.env` file and fill in the required environment variables:

  ```bash
  VITE_PROJECT_KEY=<your_project_key>
  VITE_CLIENT_ID=<your_client_id>
  VITE_CLIENT_SECRET=<your_client_secret>
  VITE_AUTH_URL=<your_auth_url>
  VITE_API_URL=<your_api_url>
  VITE_PRODUCTS_PER_PAGE=<your_products_per_page>
  VITE_SCOPES=<your_scopes_string>
  ```

- start the local server using `npm run dev`:

  ```bash
  npm run dev
  ```

The server runs on port `5173`. If it is not possible to run the server using port `5173`, you can use another port by modifying the `vite.config.ts` configuration file.

You can also use `yarn` or `pnpm` instead of `npm`, depending on your package manager.

## 📜 Available Scripts

In the project directory, you can:

- Run the app in development mode, opening `port 5173` (<http://localhost:5173>) to view the app in the browser:

  ```bash
  npm run dev
  ```

- Build the project for production to the `dist/` folder:

  ```bash
  npm run build
  ```

- Fix linting and formatting issues, running `ESLint` and `Prettier` simultaneously:

  ```bash
  npm run fix
  ```

- Format all the files according to the defined style rules running `Prettier`:

  ```bash
  npm run format
  ```

- Lint the codebase using `ESLint`, analyzing code for errors and violations of standards:

  ```bash
  npm run lint
  ```

- Automatically fix any linting issues found in the codebase, using `ESLint`:

  ```bash
  npm run lint:fix
  ```

- Inspect and debug ESLint configuration with a visual overview:

  ```bash
  npm run lint:inspect
  ```

- Preview the production build created by the `npm run build` command:

  ```bash
  npm run preview
  ```

- Initialize `Husky` hooks for Git pre-commit, pre-push, and other hooks:

  ```bash
  npm run prepare
  ```

- Run TypeScript's type-checking to check for type errors without generating any output files:

  ```bash
  npm run typecheck
  ```

- Run all unit and integration tests with Vitest:

  ```bash
  npm run test
  ```

- Launch the Vitest UI interface and generate test coverage reports:

  ```bash
  npm run test:ui
  ```

- Run all tests in headless mode with coverage report generation:

  ```bash
  npm run test:coverage
  ```

## 👥 Authors

[Maxim Moiseev](https://github.com/Mxmmsv), [Ekaterina Dmitrenko](https://github.com/ek-ole) and [Alla Tsaiukova](https://github.com/AlyaEngineer).

## 🙏 Acknowledgments

Thanks a lot to our mentors [@gentoosiast](https://github.com/gentoosiast), [@lenayork](https://github.com/LenaYork), and [@existanz](https://github.com/existanz) for helping with the project.

Thanks to the [Figma](https://figma.com/community) community for the free and accessible e-commerce website layouts that inspired us during the development of the project.

Thanks to the [RS School](https://rs.school/) for the knowledge and experience we received during the course.

Special thanks to the Commercetools team for providing a well-documented, TypeScript-ready SDK that simplified our e-commerce integration.

## 🌐 Live Demo

Check out the live application: [Poster Store](https://poster-store.netlify.app/)

## 📄🔒 License

This project is licensed under the MIT License - see the LICENSE.md file for details.
