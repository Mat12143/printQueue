FROM node:21-alpine3.18

WORKDIR /app
COPY . .
RUN npm i 
RUN npm audit fix
RUN npm run build

RUN mkdir -p /app/db
RUN mkdir -p /app/static/files

VOLUME /app/db /app/static/files

EXPOSE 3000
CMD ["node", "build"]
