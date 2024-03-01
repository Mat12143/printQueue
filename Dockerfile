FROM node:21-alpine3.18

WORKDIR /app

COPY . .
RUN npm i 
RUN npm audit fix
RUN npm run build

RUN mkdir -p /app/db
RUN mkdir -p /app/files

RUN rm -rf /app/*.yaml
RUN rm -rf /app/*.js
RUN rm -rf /app/src

VOLUME /app/db /app/files

EXPOSE 3000

CMD ["node", "build"]
