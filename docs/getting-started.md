# Démarrage

Prérequis : Node 26 (`nvm use` ou `fnm use` lit `.nvmrc`), pnpm 11, Docker.

## Mode développement

La base tourne dans Docker, les apps en local avec rechargement à chaud :

```sh
pnpm install
pnpm secret   # JWT_SECRET, écrit dans .env
pnpm infra    # user-db et recipe-db
pnpm dev      # compile les packages, puis lance toutes les apps en watch
```

Pour une seule app : `pnpm --filter @recipes/gateway dev`.

Une modification dans `packages/` est recompilée à la volée, mais les apps qui l'utilisent doivent être relancées.

## Tout dans Docker

```sh
docker compose up -d --build
```

La base n'est remplie par les fixtures qu'au premier lancement, sur un volume vide. Pour repartir de zéro : `docker compose down -v`.

## Ports

| Service       | Port local |
| ------------- | ---------- |
| gateway       | 3000       |
| user (gRPC)   | 50051      |
| user-db       | 27018      |
| recipe (gRPC) | 50052      |
| recipe-db     | 27019      |
| front         | 5173       |

Un port déjà pris ? Ajoutez les variables dans le `.env` **à la racine** du monorepo, puis relancez `pnpm infra` et `pnpm dev`. Chaque port se change **avec** l'adresse qui l'utilise :

| Port à changer | Variables à ajouter, par exemple                                                                |
| -------------- | ----------------------------------------------------------------------------------------------- |
| gateway        | `GATEWAY_PORT=3100` et `VITE_API_URL=http://localhost:3100` (pour le front)                     |
| user (gRPC)    | `USER_GRPC_PORT=50151` et `USER_GRPC_URL=localhost:50151` (pour la gateway)                     |
| user-db        | `USER_DB_PORT=27118` et `MONGO_URL=mongodb://localhost:27118` (pour le user service)            |
| recipe (gRPC)  | `RECIPE_GRPC_PORT=50152` et `RECIPE_GRPC_URL=localhost:50152` (pour la gateway)                 |
| recipe-db      | `RECIPE_DB_PORT=27119` et `RECIPE_MONGO_URL=mongodb://localhost:27119` (pour le recipe service) |
| front          | `pnpm --filter @recipes/front dev --port 5273`                                                  |

## Vérifier

```sh
pnpm lint          # ESLint sur tout le monorepo
pnpm typecheck     # TypeScript strict
pnpm format:check  # Prettier
```
