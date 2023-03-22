import { CommonErrorRes } from 'common/CommonResponse';
import { IMiddleware } from 'koa-router';
import { isEmpty } from 'lodash';
import { ValidFileOpt } from 'types/middleware/uploadProps';

export const validFile: (opt?: ValidFileOpt) => IMiddleware =
  (opt) => async (ctx, next) => {
    let fileArr = ctx.request.files?.file as any;

    if (!Array.isArray(fileArr)) fileArr = [fileArr].filter((val) => val);
    if (isEmpty(fileArr)) return await next();

    for (const file of fileArr) {
      // 文件最大限制
      if (opt?.maxSize && file.size > opt?.maxSize)
        throw new CommonErrorRes({
          message: '文件过大',
        });

      // 文件最小限制
      if (opt?.minSize && file.size < opt.minSize)
        throw new CommonErrorRes({
          message: '文件过小',
        });

      // 文件mine type限制
      if (
        !isEmpty(opt?.fileMineType) &&
        !opt?.fileMineType?.includes(file.mineType)
      )
        throw new CommonErrorRes({
          message: '文件类型不正确',
        });

      const fileTypeReg = /\.[0-9a-z]+$/i;
      const fileType = fileTypeReg.exec(file.originalFilename)?.[0];

      // 文件后缀限制
      if (
        !isEmpty(opt?.fileType) &&
        fileType &&
        !opt?.fileType?.includes(fileType)
      )
        throw new CommonErrorRes({
          message: '文件类型不正确',
        });
    }

    await next();
  };
