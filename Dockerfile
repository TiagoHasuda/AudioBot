FROM node:18.12.1

WORKDIR /discordbots/audiobot

COPY package.json ./

RUN yarn

COPY . .

RUN npm i -g ts-node

CMD ["yarn", "start"]
