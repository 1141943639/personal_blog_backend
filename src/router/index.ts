import { readdirSync } from 'fs';
import Router from 'koa-router';

const router = new Router();

const fieldRes = readdirSync(__dirname);
const filesPath = fieldRes.filter(
  (path) => !['index.ts', 'CommonRouter.ts'].includes(path)
);

for (let i = 0; i < filesPath.length; i++) {
  const path = ['./', filesPath[i]].join('');
  const result = require(path).default;

  router.use(result.routes());
}

export default router;
