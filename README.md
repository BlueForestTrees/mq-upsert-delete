# mq-upsert-delete
Microservice listening for rabbit messages and perform upsert and deletes actions on a mongo collection.


## Receiving rabbit messages.
It uses https://github.com/BlueForestTrees/messager to receive messages from rabbit queues.

Rabbit queues listening to: `${NAME}-upsert` and `${NAME}-delete` (NAME is an environment variable).

## Upsert and Delete messages into mongo collection.
It uses https://github.com/BlueForestTrees/mongo-registry to connect to mongo db.

Mongo collection used: `${DB_COLLECTION or if missing NAME}` (DB_COLLECTION is an environment variable).

Note: messages must allways contain the _id field, even for document creation.
