FROM node:18.20.1-alpine3.19

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /src/main

COPY package*.json ./

RUN yarn install

COPY . . 

EXPOSE 7984

CMD ["yarn", "start"]