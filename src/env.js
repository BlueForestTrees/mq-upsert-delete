import {version} from './../package.json'
import fs from "fs"

const ENV = {
    NAME: process.env.NAME || throwit("ENV.NAME pas défini"),
    NODE_ENV: process.env.NODE_ENV || null,
    VERSION: version,

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    DB_NAME: process.env.DB_NAME || "BlueForestTreesDB",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 27017,
    DB_USER: process.env.DB_USER || "doudou",
    DB_PWD: process.env.DB_PWD || "masta",
    DB_COLLECTION: process.env.DB_COLLECTION || process.env.NAME,

    RB_PATH: process.env.RB_PATH || "mq.json",
    QUEUE_PATH: process.env.QUEUE_PATH || "queue.json",
}

ENV.RB = JSON.parse(fs.readFileSync(ENV.RB_PATH, 'utf8'))
ENV.QUEUE = JSON.parse(fs.readFileSync(ENV.QUEUE_PATH, 'utf8'))


const debug = require('debug')(`api:${ENV.NAME}`)

debug({ENV})

module.exports = ENV