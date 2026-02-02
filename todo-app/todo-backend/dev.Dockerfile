FROM node:20

WORKDIR /usr/src/app

# We still COPY and install so the image can run independently
COPY . .

RUN npm install

# This is the key: run nodemon instead of plain node
CMD ["npm", "run", "dev"]