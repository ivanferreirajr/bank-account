FROM node:16.20.0-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start:prod"]