import errorHandle from 'utils/errorHandle';
import Koa from 'koa';
import KoaBody from 'koa-body';
import router from 'router';
import serve from 'koa-static';

const app = new Koa();

// 引入中间件
app.use(errorHandle);
app.use(
  KoaBody({
    // 允许上传文件
    multipart: true,
  })
);
app.use(router.routes());
// 创建访问已上传文件的惊天服务
app.use(serve('./upload'));

export default app;
