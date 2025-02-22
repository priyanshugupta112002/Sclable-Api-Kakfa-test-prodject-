import { connectDB } from "./config/db.config"
import kafkaConfig from "./config/kafka.config"
import { PostConsumer } from "./service/post.consumer"



export const init = async()=>{

    try {
        await connectDB()
        await kafkaConfig.connect()
        await PostConsumer()
        console.log("successful connection consumer")
    } catch (error) {
        console.log("Error in connection consumer",error)
        process.exit(1)
    }

}