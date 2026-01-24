FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV DEBUG=docker-stuff:*

CMD ["npm", "start"]