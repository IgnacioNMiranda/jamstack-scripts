# Web Scripts

Scripts to perform CRUD operations against the following third party services/platforms:

- Algolia
- Bluestone
- Cloudinary
- Commercetols
- Conscia
- Contentful
- Stytch
- Vercel

## Getting Started

1. Install dependencies using `pnpm` (install it using `npm i -g pnpm` if you don't have it)
2. Clone `.env.example` to a `.env` file and set your variables
3. Run `pnpm dev`

## Adding new scripts

Add a new TS file inside the folder of an existing service in scripts/{service}.

To add a new service:

1. Create a new folder inside `src/scripts/` named as your desired service and add your script into it.
2. Add the new service client (if needed) in the `src/clients/` folder.
3. Add environment variables to `src/environment.ts` and also an example of them inside `.env.example`.
4. Run `pnpm dev`, find your service, and run your script!

## License

[MIT](LICENSE)

## Author

[Igna](https://www.linkedin.com/in/ignacio-miranda-figueroa/)
