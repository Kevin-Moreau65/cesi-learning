FROM node:16-alpine

ADD . /app

WORKDIR /app

RUN npm i

EXPOSE 3002

CMD npm run start