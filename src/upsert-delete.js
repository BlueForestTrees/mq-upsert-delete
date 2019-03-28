import ENV from "./env"
import {dbInit, col} from "mongo-registry"
import {initRabbit, createReceiver} from "simple-rbmq"
import {del, upsert} from "./work"

const jobs = [
    {routingKey: `${ENV.NAME}-upsert`, queue: {...ENV.QUEUE, name: `${ENV.NAME}-upsert`}, work: upsert},
    {routingKey: `${ENV.NAME}-delete`, queue: {...ENV.QUEUE, name: `${ENV.NAME}-delete`}, work: del}
]

dbInit(ENV)
    .then(() => initRabbit(ENV.RB))
    .then(() => col(ENV.DB_COLLECTION))
    .then(db => Promise.all(
        jobs.map(
            job => createReceiver(ENV.RB.exchange, job.routingKey, job.queue, msg => job.work(msg, db))
        )
    ))