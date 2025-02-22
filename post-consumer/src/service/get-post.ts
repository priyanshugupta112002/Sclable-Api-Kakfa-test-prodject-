import { Hono } from "hono";
import { RedisConfig } from "../config/redis.config";
import PostModel from "../model/post";

const app = new Hono()
const redis = new RedisConfig()

app.get('get-post/:pid',async(c)=>{

    const pid = c.req.param("pid")  // another approach

    if(!pid){
        return c.json({
            message:"Id is required"
        })
    }
    try {
        const cashedPost = await redis.getpost(pid);
        if(cashedPost && Object.keys(cashedPost).length > 0){
            return c.json(cashedPost ,200)
        }

        const post = await PostModel.findOne({Pid:pid})
        if(!post){
            return c.json({
                message:"Post not found"
            }, 400)
        }
        await redis.feedChache(post)
        return c.json(post,200)

    } catch (error) {
        return c.json({
            message:"Error in getting message",
          
        },500)
    }
   

})