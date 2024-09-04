FROM node:18.20.1-alpine3.19

RUN addgroup app && adduser -S -G app app

WORKDIR /server

COPY package*.json ./
RUN yarn install
COPY . . 
RUN chown -R app:app /server
USER app

EXPOSE 7984

RUN yarn build
CMD ["yarn", "start"]
