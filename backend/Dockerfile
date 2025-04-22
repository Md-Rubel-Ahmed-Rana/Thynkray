FROM node:18-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY ./prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 6001

CMD ["npm", "start"]
