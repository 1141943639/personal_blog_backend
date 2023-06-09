import Koa from 'koa';
import KoaBody from 'koa-body';
import router from 'router';

const app = new Koa();

// 引入中间件
app.use(KoaBody());
app.use(router.routes());

export default app;
