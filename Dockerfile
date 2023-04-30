FROM node:16-alpine
RUN apk update
WORKDIR /usr/app
COPY ./package*.json ./
RUN npm install --force
COPY . ./
EXPOSE 9090
CMD npm run build:prod