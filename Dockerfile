FROM node:21-alpine3.18

WORKDIR /app
COPY package.json ./
RUN npm i
COPY . .
RUN npm run build
RUN rm -rf src
RUN rm -rf .??*

ENV ORIGIN=http://localhost:3000

EXPOSE 3000
CMD ["node", "build"]
