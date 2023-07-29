# Specify the Node.js version to use
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install any needed packages
RUN npm install --only=production
RUN npm i -g @nestjs/cli
RUN npm run build

COPY . .

EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "npm", "run", "start:prod" ]
