import mongoose from "mongoose";

const connectToMongo = async () => {
    const res = await mongoose.connect("mongodb+srv://jazlan:jazlan@cluster1.tkv4fyt.mongodb.net/?retryWrites=true&w=majority");

    if (res) {
        console.log("Connected Sucessfull")
    }
}

export default connectToMongo