import { Hono } from 'hono'
import { init } from './start.service'
import createPost from './service/create-post'
const app = new Hono()

init();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/',createPost)

export default app
