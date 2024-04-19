### Start Project
```
nest start
```
### Seed database



### Install redis
```
brew install redis
```

### Install colima and docker
```
brew install colima
brew install docker
```
### Start Colima
```
colima start
docker ps
```
### Start Redis with Bloom Filters

```
docker run -p 6379:6379 --name redis-redisbloom redislabs/rebloom:latest
docker run -p 6379:6379 -it --rm redis/redis-stack-server:latest
```

### Seed cache and DB
```
curl -X POST 'http://localhost:3000/seeder/seed?entries=100000'
```

### Search for a particular item in Cache and DB

```
curl -X GET 'http://localhost:3000/test/check/item-99895'
```