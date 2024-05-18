FROM node:alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

COPY .envs/.env.production ./.env.production

RUN yarn build

RUN npm prune --production

FROM node:alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public

COPY .envs/.env.production ./.env.production

EXPOSE 3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

CMD ["yarn", "start"]