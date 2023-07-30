FROM node:16

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod
RUN npm i -g @nestjs/cli

COPY tsconfig*.json ./

RUN pnpm run build

COPY . ./

EXPOSE 3000

CMD [ "pnpm", "run", "start:prod" ]
