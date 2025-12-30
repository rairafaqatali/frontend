# real-estate-search-portal-client

This project is the **Angular 13 frontend** for the Real Estate Search Portal application.

---

## Angular & Tool Versions

- Angular: 13.x
- Angular CLI: 13.x
- Node.js: 16.x
- TypeScript: ~4.4
- Bootstrap: 5.x
- PrimeNG: 13.x

---

## Application Configuration

After all the required dependencies are configured,
run **npm i**
and then **ng serve**

### Environment Settings

API base URL is configured via Angular environments.

#### `src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000'
};

