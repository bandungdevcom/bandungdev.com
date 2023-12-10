# BandungDev.com

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

BandungDev website platform is a 🚧 Work in Progress.

Check out:

- Web: <https://bandungdev.com>
- Repo: <https://github.com/bandungdevcom/bandungdev.com>

Project structure based on [Dogokit](https://dogokit.allnimal.com) using Remix,
React, Tailwind CSS, Radix UI, Prisma ORM, and more.

## Setup

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

This also run the `postinstall` script from `package.json` which by default run
`prisma generate`.

> Note: Not using Bun yet as there are still some issues.

### Prisma Client Generation

By default installing the modules is also running the `postinstall` script that
generate the Prisma Client (`@prisma/client`) for it to be used in the app.

If it isn't generated or need to generate manually, run:

```sh
pnpm db:gen
# prisma generate
```

### Code Quality

Log, format, lint to check if the setup is fine:

```sh
pnpm check
# check: env typecheck prettier eslint stylelint prisma
```

```sh
pnpm fix
# fix: prettier eslint stylelint prisma
```

> Note: Can ignore non-critical warning from ESLint and TypeScript

### Database Instance

Prisma ORM is used to communicate with the database easily.

If prefer using Docker and Docker Compose for local development,
[follow this guide on database](docs/GUIDE_DATABASE.md).

The app will be deployed primarily using PlanetScale, the migration files are
not needed. Therefore, push the schema directly there. The migration process
will be handled through the
[deploy requests](https://planetscale.com/docs/concepts/deploy-requests).
Although using an ORM, there's still also a way to run a raw query.

Also read:

- [Prisma with PlanetScale](https://prisma.io/docs/guides/database/planetscale)
- [PlanetScale with Prisma](https://planetscale.com/docs/prisma/prisma-quickstart)

### Environment Variables

Create the `.env` file from `.env.example`. This is the one for local
development, not production

```sh
cp -i .env.example .env
```

Configure the required environment variables if on local, otherwise in the
project settings on other environments.

If necessary, create the `.env.production` for production access. Adjust
accordingly if need for `staging`, `test`, etc.

```sh
cp -i .env.example .env.production
```

Required:

- `APP_URL`: For example, `http://localhost:3000`
- `DATABASE_URL`: For example, `mysql://user:password@localhost:3060/bandungdev`
- `SESSION_SECRET`: For example, `the_secret_text`

#### Database Setup

For the database, either choose to use MySQL or PostgreSQL from local system,
Docker container, services like [PlanetScale](https://planetscale.com) (MySQL)
or [Neon](https://neon.tech) (PostgreSQL).

If prefer using Docker and Docker Compose for local development,
[follow this guide](docs/DATABASE.md).

#### MySQL Database with PlanetScale

To start quickly, create a [PlanetScale](https://planetscale.com) account to
have a MySQL instance for development and production. After the database has
been created, "Get the connection string", select "Prisma", then copy the full
`DATABASE_URL`.

> Keep in mind the free plan only allow for 1 database. So either later keep it,
> delete it when unused, or upgrade the plan. There's also a verification with a
> payment card, even though it's still free to start.

Generate a random string for the `SESSION_SECRET` using
`openssl rand -base64 32` on the terminal or put any long random text.

```sh
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/database-name?sslaccept=strict"
SESSION_SECRET="random_secret_text"
```

### Database Operations

Sync between Prisma schema and the database directly, by making schema changes
with `prisma db push`, which can be done regularly while updating the models:

```sh
pnpm db:push
# prisma db push
```

> Note: Only need to push the schema in development. No need for migration
> files.

Even with local development without PlanetScale, pushing the schema directly is
still okay when in development or
[prototyping the schema](https://prisma.io/docs/concepts/components/prisma-migrate/db-push).
After a success push, then it will automatically run `prisma generate`.

Optionally, create `users.json` in `prisma/credentials` folder with the format
below. Can focus on certain users who want to be able to sign in in development,
so it doesn't have to be everyone.

```json
[
  {
    "fullname": "User Name",
    "username": "username",
    "nickname": "User",
    "email": "user@user.com",
    "password": "useruser",
    "roleSymbol": "ADMIN"
  }
  // ...
]
```

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

This will also run `prisma generate` too before the build.

Then try to run the app in production mode:

```sh
pnpm start
```

If familiar with deploying node applications, the built-in Remix app server is
production-ready. Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Development

Finally, develop the app while running the development server:

```sh
pnpm dev
# remix dev --manual
```

Open <http://localhost:3000> and it's ready!

## What's Next?

Develop the app as usual, the Remix way.

## References

### Inspirations

- SurabayaDev

---

©️ BandungDev
