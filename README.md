# QTail
**QTail is a simple way to keep track of your 3D Print queue**

> Built with [Sveltekit](https://kit.svelte.dev), TailwindCSS and SQLite
> 
> Using [Traefik](https://doc.traefik.io/traefik/) as a Reverse Proxy

Developed for [Officina Tecnologica, Canalescuola](https://www.canalescuola.it/officina)
# Showcase

![](https://github.com/Mat12143/qTail/blob/master/docs/config.png)
_First time configuration_

![](https://github.com/Mat12143/qTail/blob/master/docs/add.png)
_New Task_

![](https://github.com/Mat12143/qTail/blob/master/docs/home.png)
_Admin Interface Homepage_

![](https://github.com/Mat12143/qTail/blob/master/docs/printed.png)
_HomePage_
## Installation
### Requirements
- Docker version >= 25.0.3
- Docker Compose plugin >= v2.24.5

Create a ```.env``` file in the root of the repo. The .env file has only one propriety
```.env
EXPOSE_IP=localhost # The IP where the app should listen
```

To create the Docker stack simply execute
```bash
docker compose up -d
```
> All the configuration is in the [docker-compose.yaml](https://github.com/Mat12143/qTail/blob/master/docker-compose.yaml) file

To stop all containers:
```bash
docker compose down
```
> The database file and 3d models files are in the respectively in the db and files volumes
