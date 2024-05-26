FROM node:alpine as BUILD_IMAGE

WORKDIR /app

EXPOSE 3000

ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=development

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Uncomment if you need to build the React application
# COPY .envs/.env.local ./.env.local
# RUN npm run build

# The following line to keep the container running if there is an error for debugging
# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "start"]
