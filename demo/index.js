const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myProject';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  // 插入数据
  // const res = await collection.insertOne({ name: 'zl', age: 20 });
  // const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);

  // 查询数据 - find的时候返回的是一个基础的指针对象，而不是直接的结果
  // const res = await collection.findOne({ name: 'zl' });
  // const res = collection.find();

  // 高级查询和逻辑
  // 使用 forEach
  // await res.forEach(doc => console.log(doc));
  // 使用 toArray

  // 比较操作符  $gt - 大于  $lt - 小于  大于等于 - $gte  小于等于 - $lte    等于 $eq  不等于 $neq
  // const res = await collection.find({ a: { $gt: 1 }, hobby: 'ball' }).toArray();

  // 逻辑操作符
  // const filter = {
  //   $or: [
  //     { a: { $gte: 3 } },
  //     { name: 'zl' },
  //   ],
  // };
  // const res = await collection.find(filter).toArray();

  // element 操作符 $exists $type
  // const res = await collection.find({ hobby: { $exists: true } }).toArray();

  // const res = await collection.find({ age: { $type: 'number' } }).toArray();

  // 更新数据
  // const res = await collection.updateOne(
  //   { a: 2 },
  //   { $set: { hobby: 'ball' } },
  // );

  // 删除文档数据
  // const res = await collection.deleteMany({ a: 1 });

  // 创建索引
  // const indexName = await collection.createIndex({ a: 2 });

  // 对数据结果的操作  比如排序，挑选一个条目
  // const options = {
  //   // limit: 1,
  //   // skip: 2,
  //   // sort: { age: -1 }, // 1 为升序  -1 为降序
  //   // projection: { _id: 0, name: 1 }, // 返回数据不展示某个字段，id 如果不设置为0 会包含早返回结果中,也支持在find之后链式调用
  // };
  // const res = await collection
  //   .find({ age: { $type: 'number' } }, options)
  //   .toArray();

  // 更新
  const res = await collection.replaceOne({ name: 'xiaoming1' }, { name: 'zl4', age: 100, hobby: 'sk' });
  console.log(res, 'res');
  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
