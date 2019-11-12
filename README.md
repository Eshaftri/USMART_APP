# Real-time webApp with Websocket & Elasticsearch

This project is to monitoring cryptocurrency transactions, by consume data form WebSocket API Real-Time Data and insert the message data into an Elasticsearch container using Nodejs,koa and vue.js.

## Requirements

### Docker
For run the project, you will only need Doker installed on your environement.

## Run the project
1. build Node.js application container.

```
docker-compose build
```

2. launch entire application stack.
```
docker-compose up
```

3. start connection with Elasticsearch
```
docker exec gs-api "node" "server/connection.js"
```

4. start real time data load.
```
docker exec gs-api "node" "server/load_data.js"
```

5. visit  `localhost:8080`  in your browser - you should see a Real-time cryptocurrency transactions.
