import CommonRouter from './CommonRouter';

const router = new CommonRouter({
  prefix: '/user',
});

router.post('/register');

export default router;
