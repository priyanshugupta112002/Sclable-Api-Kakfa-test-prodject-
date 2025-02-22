import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/post";



export const PostConsumer = async()=>{
    const messages:any[] = []
    let Processing =false;

    try {
        await kafkaConfig.subscribeToTopic("post");
        await kafkaConfig.consume(async(message)=>{
                
                messages.push(message)
                console.log("message received:", message )
                if(messages.length>10){
                    //bulk push into database 
                    processBatch()
                }
        })
        setInterval(processBatch, 5000);  // run fater every 5 sec

    } catch (error) {
        
    }

    async function processBatch(){
            if(messages.length>0 && !Processing) {
                Processing = true
                const batchProcess = [...messages]
                messages.length = 0   // this line might not required; 
               
                try {
                    await PostModel.insertMany(batchProcess ,{ordered:false})
                    console.log("bulk inserted")
                } catch (error) {
                    console.log("error in bulk insertion")
                    messages.push(...batchProcess)
                } finally{
                    Processing = false
                }
            }
    }
}