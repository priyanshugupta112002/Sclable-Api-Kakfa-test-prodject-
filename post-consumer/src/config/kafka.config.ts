import {Kafka  ,  logLevel, Consumer, Partitioners} from 'kafkajs';

class KafkaConfig{

    private kafka:Kafka;
    private consumer:Consumer
    private broker:string

    constructor(){
        this.broker = process.env.kakafaBroker || '192.168.100.24:9092'
        this.kafka = new Kafka({
            clientId : 'post-producer',
            brokers : [this.broker],
            logLevel  :logLevel.ERROR
        })
        this.consumer = this.kafka.consumer({
            groupId: "post-consumer"
        })    
    }


    async connect() : Promise<void>{
        try {
            await this.consumer.connect()
            console.log("kafka connected")
        } catch (error) {
            console.log("Kafka is not connected",error);
        }
    }
    
    async subscribeToTopic(topic:string):Promise<void>{

        try {
            await this.consumer.subscribe({
                topic,
                fromBeginning:true
            })
            console.log("subscribe to topic", topic)

        } catch (error) {
            console.log("error in subscribe to topic",error)
        }
    }

    async consume(callback:(message:any)=>void):Promise<void>{

        try {
            await this.consumer.run({
                eachMessage: async ({topic , partition , message})=>{
                    callback(JSON.parse(message?.value?.toString()!));
                }
            })
        } catch (error) {
            
        }

    }

    async disconnect():Promise<void>{
        try {
            await this.consumer.disconnect()
            console.log("producer and admin is disconnect")
        } catch (error) {
            console.log("error in disconnect od admin and producer",error)
        }
    }

}

export default new KafkaConfig();