FROM node:16.18.1-buster-slim AS build

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install --frozen-lockfile

COPY index.html ./
COPY tsconfig.node.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY .eslintrc.cjs ./
COPY ./public ./public/
COPY ./src ./src/

RUN yarn tsc
RUN yarn vite build

#################
# Запуск
FROM node:16.18.1-buster-slim AS deploy

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/dist ./dist

# Команда для запуска сервера внутри контейнера
CMD [ "serve", "-s", "dist" ]