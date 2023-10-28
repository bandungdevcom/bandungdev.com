# 🏯 BandungDev.com

Bandung Developer Community Website

> 🚧 This web app is still in early and active development

Check out:

- Web: <https://bandungdev.com>
- Repo: <https://github.com/bandungdevcom/bandungdev.com>
- Progress: <https://github.com/orgs/bandungdevcom/projects/1>

## Concept

- [ ] Discover community team and members
- [ ] Explore various events, online and offline/onsite
- [ ] Search for jobs and companies

## UI Design

Figma link:
<https://www.figma.com/file/UXLCWrL8yvpqoUCxY5vOGs/BandungDev.com-UI>

## Getting Started

1. Read about [Remix](https://remix.run) and the
   [Remix Docs](https://remix.run/docs) to understand about Remix.
2. If new, focus on Remix basics. Read
   [Super Simple Start to Remix](https://kentcdodds.com/blog/super-simple-start-to-remix).
3. If experienced, use various integration such as Prisma ORM and database like
   MySQL. Read
   [Blog Tutorial (short)](http://remix.run/docs/en/main/tutorials/blog) and
   [App Tutorial (long)](http://remix.run/docs/en/main/tutorials/jokes).

## Primary Tech Stack

1. [TypeScript](https://typescriptlang.org): Typed language
   - Related to JavaScript, HTML, CSS
2. [React](https://react.dev): UI library
3. [Remix](https://remix.run): Full stack web framework
   - [React Router](https://reactrouter.com): Routing
4. [Tailwind CSS](https://tailwindcss.com): Styling
5. [Radix UI](https://radix-ui.com): Interactive components
   - [shadcn UI](https://ui.shadcn.com): Styled interactive components
6. [Prisma](https://prisma.io): Database ORM
7. [PlanetScale](https://planetscale.com): MySQL-compatible serverless database
   platform
   - [MySQL](https://mysql.com): Database management system (DBMS)
8. [Docker](https://docker.com): Containerization
   - [Docker Compose](https://docs.docker.com/compose): Multi-container Docker
9. [Vercel](https://vercel.com): Web app deployment

Use later:

- [Vitest](https://vitest.dev) vs [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com)
- [Playwright](https://playwright.dev) vs [Cypress](https://cypress.io)

Don't use:

- styled-components, @emotion, Stitches, Chakra UI, MUI, etc
- TanStack/React Query, SWR, Axios, etc
- Redux, Zustand, Jotai, XState, etc

## Development

### Dependencies

Use [pnpm](https://pnpm.io) to improve productivity and replace npm, so make
sure [pnpm is installed](https://pnpm.io/installation#using-npm):

```sh
npm i -g pnpm
```

To run the app locally, make sure the project's local dependencies are
installed:

```sh
pnpm install
```

### Code

Format, lint, and build to check if the setup is fine:

```sh
pnpm check
# run: format lint stylelint build typecheck

pnpm check:fix # to fix most cases if there's an issue
# run: format:fix lint:fix stylelint:fix
```

> Note: Ignore non-critical warning about ESLint and TypeScript

### Database

Prisma ORM is used to communicate with the database easily. Since this app is
primarily using PlanetScale, the migration files are not needed. Therefore, push
the schema directly there, then the migration will be handled through the
[deploy requests](https://planetscale.com/docs/concepts/deploy-requests).

Also read:

- [Prisma with PlanetScale](https://prisma.io/docs/guides/database/planetscale)
- [PlanetScale with Prisma](https://planetscale.com/docs/prisma/prisma-quickstart)

If prefer using Docker and Docker Compose for local development,
[follow this guide](docs/DATABASE.md).

### Environment Variables

Create the `.env` file from the example `.env` file.

```sh
cp -i .env.example .env
```

> This .env file is only for local development, not production

Let's configure the required environment variables in the `.env` file if local,
otherwise in the project settings, for:

- `DATABASE_URL`
- `SESSION_SECRET`

For the database, either choose to use PlanetScale or local Docker container. If
prefer using Docker and Docker Compose for local development,
[follow this guide](docs/DATABASE.md).

If not using any local database, create a [PlanetScale](https://planetscale.com)
account to have a MySQL instance for development. After the database has been
created, "Get the connection string" and select "Prisma", then copy the full
`DATABASE_URL`.

> Keep in mind the free plan only allow for 1 database. So either later keep it,
> delete it when unused, or upgrade the plan.

Generate a random string for the `SESSION_SECRET` using
`openssl rand -base64 32` on the terminal or put any long random text.

```sh
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/bandungdev?sslaccept=strict"
SESSION_SECRET="random_secret_text"
```

#### Schema to Push

Sync between Prisma schema and the database directly, by making schema changes
with `prisma db push`, which can be done regularly while updating the models:

```sh
pnpm db:push
# prisma db push
```

Even with local development without PlanetScale, pushing the schema directly is
still okay when
[prototyping the schema](https://prisma.io/docs/concepts/components/prisma-migrate/db-push).
After a success push, then it will automatically run `prisma generate`.

#### Data for Credentials

Create `users.json` in `prisma/seed-credential` folder with the format below.
You can focus on certain users who want to be able to sign in in development, so
it doesn't have to be everyone. Password is also optional as there is an
authentication method with OAuth that is not require a password.

```json
[
  {
    "fullname": "User One",
    "email": "user1@example.com",
    "username": "username",
    "tags": ["TEAM", "DEVELOPER"]
  },
  {
    "fullname": "User Two",
    "email": "user2@example.com",
    "username": "username2",
    "tags": ["TEAM", "ADVISOR"]
  }
  // ...
]
```

#### Data for Seed

Then seed the initial data when needed:

```sh
pnpm db:seed
# prisma db seed
```

### Build

Check if the build is fine. This als be used to build the app for production.

```sh
pnpm build
# remix build
```

> This will also run `prisma generate` too before the build

Then try run the app in production mode:

```sh
pnpm start
```

> This repo has been officially deployed to Vercel and hosted at
> <https://bandungdev.com>

### Develop Locally

If everything works fine, start the Remix development server like so:

```sh
pnpm dev
# remix dev
```

This starts the app in development mode, rebuilding assets on file changes.

Open up [http://localhost:3000](http://localhost:3000) and it should be ready to
go!

Regularly, either push or generate the schema after changing the Prisma schema
or database models.

```sh
pnpm db:push
# prisma db push

pnpm db:gen
# prisma generate
```

### Checking Dependencies

To keep the dependencies up to date, use [taze](https://github.com/antfu/taze).

```sh
pnpm dlx taze
# or if installed globally
taze
```

## Deployment

This repo has been setup to auto deploy to Vercel automatically on Git push. Can
also be deployed to other new projects on Vercel.

After having run the `create-remix` command and selected "Vercel" as a
deployment target, [import the Git repository](https://vercel.com/new) into
Vercel.

Configure the required environment variables in project settings for:

- `DATABASE_URL`
- `SESSION_SECRET`

Then deploy it. There should be the deployed URL like
<https://bandungdev.vercel.app>.

## References

### Related

Remix app setup:

- [💿 Remix Indie Stack](https://github.com/remix-run/indie-stack)
- [🚀 Epic Stack](https://github.com/epicweb-dev/epic-stack)
- [🐶 Dogokit Remix](https://github.com/dogokit/dogokit-remix)
- [🐻 Bearmentor](https://github.com/bearmentor/bearmentor)
- [⏪ Rewinds](https://github.com/mhaidarhanif/rewinds)

## Contributors

| Nick   | Full Name           | Username      | Role                                           |
| ------ | ------------------- | ------------- | ---------------------------------------------- |
| Haidar | M Haidar Hanif      | @mhaidarhanif | Lead, Full Stack Web Developer, UI/UX Designer |
| Fikri  | Fikri Alwan         | @FikriAR19    | Frontend Web Developer                         |
| Abui   | Abui Muliadi        | @abuiiam      | Frontend Web Developer, UI/UX Designer         |
| Rizky  | Rizky Alam          | @rizkyalamz   | Backend Web Developer, Infra/System Engineer   |
| Raka   | Raka Pratama        | @tamagossi    | Full Stack Web Developer                       |
| Rijal  | Muhamad Rijal       | @MhdRijal     | Full Stack Web Developer                       |
| Agus   | Agus Wesly          | @aguswesly    | Full Stack Web Developer                       |
| Rendi  | Rendi Bayu Setiawan | @straynekoren | Full Stack Web Developer                       |
| Maahir | M. Maahir Maulana   | @maulana48    | Backend Web Developer                          |

(Ordered by join date)
