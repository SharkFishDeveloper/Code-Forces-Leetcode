# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN cd packages/db && npx prisma generate

EXPOSE 3000

WORKDIR /usr/src/app

CMD ["npm", "run", "dev"]
