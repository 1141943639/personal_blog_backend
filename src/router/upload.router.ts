import uploadController from 'controller/upload.controller';
import CommonRouter from './CommonRouter';

const router = new CommonRouter({
  prefix: '/upload',
  unauthorizedInterface: '*',
});

router.post('/', uploadController.upload);

export default router;
