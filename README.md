## Bloom Filters, Cuckoo Filters in Nest.js && Redis

A repository used to showcase the usage of bloom filters and cuckoo filters with Redis.
Testing an item will prin a JSON structure that will showcase benchmarks for doing search over Redis Cache/ Bloom / Cuckoo Filters

## Commands

### Start Project
```
nest start
```

### Install redis
```
brew install redis
```

### Install colima and docker
```
brew install colima
brew install docker

```
### Start Colima in order to start docker
```
colima start
```
### Start Redis with Bloom Filters and Cuckoo Filters

```
docker run -p 6379:6379 -it --rm redis/redis-stack-server:latest
```

### Clean Docker and Redis

```
docker system prune --all
```

### Seed cache and DB
```
curl -X POST 'http://localhost:3000/seeder/seed?entries=100000'
```

### Search for a particular item in Cache and DB

```
curl -X GET 'http://localhost:3000/test/check/item-99895'
```