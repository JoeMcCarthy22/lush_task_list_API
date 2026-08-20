# Lush task API
## I have created the following code but unable to test properly via Docker due to capacity issues on my current device!
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "start"]