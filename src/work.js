export const upsert = (doc, db) => db.updateOne(
    {_id: doc._id},
    {$set: doc},
    {upsert: true}
)

export const del = (doc, db) => db.deleteOne({_id: doc._id})