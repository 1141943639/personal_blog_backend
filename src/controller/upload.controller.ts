import { CommonSuccessRes } from 'common/CommonResponse';
import configDefault from 'config/config.default';
import { createReadStream, createWriteStream } from 'fs';
import { ensureFileSync } from 'fs-extra';
import { IMiddleware } from 'koa-router';
import { join } from 'path';

class UploadController {
  upload: IMiddleware = async (ctx) => {
    let fileArr = ctx.request.files?.file as any;
    const filePathArr: string[] = [];

    if (!Array.isArray(fileArr)) fileArr = [fileArr];

    for (const file of fileArr) {
      // 拼接存放地址
      const dirPath = join(process.cwd(), '/upload', file.originalFilename);

      // 用流写入文件
      await new Promise((resolve) => {
        ensureFileSync(dirPath);
        const reader = createReadStream(file.filepath);
        const writer = createWriteStream(dirPath);

        reader.pipe(writer);

        reader.on('close', resolve);
      });

      // 返回访问地址
      filePathArr.push(
        join(
          `http://localhost:${configDefault.APP_PORT}`,
          file.originalFilename
        )
      );
    }

    ctx.body = new CommonSuccessRes(
      filePathArr.length > 1 ? filePathArr : filePathArr[0]
    );
  };
}

export default new UploadController();
