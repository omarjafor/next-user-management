import mongoose from "mongoose"


const connectDB = async () => {
    const url = process.env.DB_URL
    mongoose
    .connect(url)
    .then(() => console.log('Database Connection Successfull'))
    .catch(e => console.log(e))
}

export default connectDB;