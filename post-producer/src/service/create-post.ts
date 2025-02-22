import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from "zod";
import kafkaConfig from "../config/kafka.config";
import { v4 as uuid} from "uuid"
import { RedisConfig } from "../config/redis.config";
const app = new Hono()
const redis = new RedisConfig()

app.post('/create-post',
    zValidator('json', z.object({
        title: z.string(),
        content: z.string(),
    })),
    async(c) =>{
        const {title , content} = c.req.valid("json")
        const Pid = uuid()
        try {
            console.log("post req")
            await kafkaConfig.sentToTopic('post',JSON.stringify({Pid , title, content}))

            // store in redis
            await redis.feedChache({Pid, title , content})

            return c.json({message:"post created" , Pid})
        } catch (error) {
            console.log("error in snding message", error)
            return c.json({error : "error in sending message"} ,500)
        }

})
export default app;

