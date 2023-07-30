FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig*.json ./

RUN npm install -g pnpm
RUN pnpm install --prod
RUN npm i -g @nestjs/cli

COPY . ./
RUN pnpm run build


EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "pnpm", "run", "start:prod" ]
