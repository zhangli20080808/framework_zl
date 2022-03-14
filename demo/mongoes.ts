import { connect, model, disconnect, Schema } from "mongoose";

async function main() {
  try {
    await connect("mongodb://localhost:27017/hello");
    console.log("connect success");
    // const ProductSchema = new Schema({
    //   price: { type: Number },
    //   name: { type: String },
    // });
    // const ProductModel = model("Product", ProductSchema);
    // const result = await ProductModel.create({
    //   price: 200,
    //   name: "zl123",
    // });
    // const res = new ProductModel({
    //   price: 200,
    //   name: "zl123",
    // })
    // await res.save()
    // 将现有的collection和Schema做对应
    const UserSchema = new Schema(
      {
        name: { type: String },
        age: { type: Number },
        team: { type: Schema.Types.ObjectId, ref: "Team" },
      },
      // { collection: "user" }
    );
 
    const UserModel = model("User", UserSchema);
    const result =  await UserModel.create({
      age: 10,
      name: "zlss",
    });
    // const result = await UserModel.find({ price: { $gt: 100 } }).exec();
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    await disconnect();
  }
}

main();
