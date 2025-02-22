import {Kafka , Admin ,  logLevel , Producer} from 'kafkajs';


class KafkaConfig{

    private kafka:Kafka;
    private producer:Producer
    private admin:Admin
    private broker:string

    constructor(){
        this.broker = process.env.kakafaBroker || '192.168.100.24:9092'
        this.kafka = new Kafka({
            clientId : 'post-producer',
            brokers : [this.broker],
            logLevel  :logLevel.ERROR
        })
        this.producer = this.kafka.producer()
        this.admin = this.kafka.admin()        
    }


    async connect() : Promise<void>{
        try {
            await this.producer.connect()
            await this.admin.connect()
            console.log("kafka connected")
        } catch (error) {
            console.log("Kafka is not connected",error);
        }
    }

    async createTopic(topic :string) : Promise<void>{
        try {
            
            await this.admin.createTopics({
                topics: [{ topic, numPartitions: 1}]
            });
            
            console.log("topic created1:",topic);
        } catch (error) {
            console.log("error in creating topic ",error)
        }
    }
    async sentToTopic(topic:string , message:string) : Promise<void>{
        try {
            
            await this.producer.send({
                topic,
                messages:[{value:message}]
            })
        } catch (error) {
            console.log("error in sent to topic method ",error)
        }
    }

    async disconnect():Promise<void>{
        try {
            await this.producer.disconnect()
            await this.admin.disconnect()
            console.log("producer and admin is disconnect")
        } catch (error) {
            console.log("error in disconnect od admin and producer",error)
        }
    }

}

export default new KafkaConfig();