import mongoose from "mongoose";

interface Post{
    title:string,
    content:string,
    Pid:string
}

const PostSchema = new mongoose.Schema<Post>({
    Pid:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }

})

const PostModel = mongoose.models.Post || mongoose.model('Post' , PostSchema)

export default PostModel