FROM node:20.11.0

WORKDIR /app
COPY package*.json ./
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]