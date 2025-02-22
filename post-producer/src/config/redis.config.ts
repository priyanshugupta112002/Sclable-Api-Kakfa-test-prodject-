import { Redis } from "ioredis";

interface POST{
    Pid:string,
    title:string,
    content:string
}

export class RedisConfig{

    private redis : Redis | undefined

    constructor(){
        if(this.redis){
            console.log("redis already created")
            return
        }
        try {
            this.redis = new Redis()
        } catch (error) {
            throw new Error("Error in init Redis")
        }
    }

    // method - saved post to redis
    async feedChache(post:POST){

        if(!this.redis){
            console.log("redis is not connected")
            return
        }
        try {
            await this.redis.hset(`post:${post.Pid}`,post)
            console.log("Post saved in redis")
        } catch (error) {
            console.log("error in saving the post")
            throw new Error("error in saving post to the redis")
        }



    }


}