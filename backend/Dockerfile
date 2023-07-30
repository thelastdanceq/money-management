FROM node:18-alpine

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

# Define the command to run your app using CMD which defines your runtime
CMD [ "pnpm", "run", "start:prod" ]
