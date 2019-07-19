FROM node:alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY /package.json /src/app

RUN npm install

COPY . .

EXPOSE 3002

CMD [ "node", "server/index.js" ]