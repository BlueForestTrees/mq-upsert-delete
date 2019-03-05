import ENV from "./env"
import {dbInit, col} from "mongo-registry"
import {initRabbit, createReceiver} from "simple-rbmq"

dbInit(ENV)
    .then(() => initRabbit(ENV.RB))
    .then(() => col(ENV.DB_COLLECTION))
    .then(db => Promise.all([
        initRobot("upsert", db, upsert),
        initRobot("delete", db, del)
    ]))

const initRobot = (action, db, work) =>
    createReceiver(
        ENV.RB.exchange,
        `${ENV.NAME}-${action}`,
        {...ENV.QUEUE, name: `${ENV.NAME}-${action}`},
        msg => work(msg, db)
    )

const upsert = (doc, db) => db.updateOne(
    {_id: doc._id},
    {$set: doc},
    {upsert: true}
)

const del = (doc, db) => db.deleteOne(
    {_id: doc._id}
)
