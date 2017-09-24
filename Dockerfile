FROM node:8.4

ADD . /app

WORKDIR /app

RUN npm run production

CMD node .dist/server.js

EXPOSE 3000