FROM node:18.13.0

COPY . /app

WORKDIR /app

RUN npm install

ENTRYPOINT ["npx", "tsx", "src/index.ts" ]
