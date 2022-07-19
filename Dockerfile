FROM node:16-alpine

ADD . /app

WORKDIR /app

RUN npm i

EXPOSE 3001

CMD npm run start