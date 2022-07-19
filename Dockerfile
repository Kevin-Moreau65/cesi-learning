ROM node:16-alpine

ADD . /app

WORKDIR /app

RUN npm i

EXPOSE 3000

CMD npm run start