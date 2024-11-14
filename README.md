# jamstack-scripts

Scripts to perform CRUD operations against the following services:

- Algolia
- Bluestone
- Commercetols
- Conscia
- Contentful
- Stytch

## Getting Started

1. Install dependencies using `pnpm` (install it using `npm i -g pnpm` if you don't have it)
2. Clone `.env.example` to a `.env` file and set your variables
3. Run `pnpm start`

## Adding new scripts

Add a new TS file inside the existing scripts/_service_ folders.

To add a new service:

1. Create a new folder inside `src/scripts/` named as the service and add your script into it
2. Add the new service client (if needed) in the `src/clients/` folder.
3. Add environment variables to `src/environment.ts` and also an example of them inside `.env.example`.

## License

[MIT](LICENSE)

## Author

[Ignacio Miranda Figueroa](https://www.linkedin.com/in/ignacio-miranda-figueroa/)
