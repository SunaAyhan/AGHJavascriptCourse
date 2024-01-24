//app.ts
import { Application, Context, renderFile } from './deps.ts';
import { oakCors } from './deps.ts';
const app = new Application();
const deno_logo = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Deno_2021.svg/120px-Deno_2021.svg.png';

app.use(oakCors());


app.use(async (ctx: Context) => {
  if (ctx.request.method === 'GET') {
    //views index.ejs with deno logo
    
    ctx.response.body = await renderFile('views/index.ejs', { deno_logo });
  } else if (ctx.request.method === 'POST') {
    //get value from form pos
    const body = await ctx.request.body().value;
    const data = await body
    const name = await body.get('name')
    console.log(data)
    ctx.response.body = `Hello '${name}'!`;
  }
});

console.log('Server is running on port 8000');
await app.listen({ port: 8000 });