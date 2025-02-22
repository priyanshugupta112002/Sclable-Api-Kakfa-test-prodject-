import kafkaConfig from "./config/kafka.config";

export const init =async()=>{

    try {
        await kafkaConfig.connect();
        await kafkaConfig.createTopic('post');

    } catch (error) {
        console.log("error init service",error)
        process.exit(1);
    }

}