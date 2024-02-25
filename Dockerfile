FROM node:21-alpine3.18

WORKDIR /app
COPY . .
RUN npm i 
RUN npm audit fix
RUN npm run build

VOLUME /app/db /app/static/files

EXPOSE 3000
CMD ["node", "build"]
