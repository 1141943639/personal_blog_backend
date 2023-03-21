import { Context } from 'koa';

declare module 'koa' {
  interface Context {
    state: {
      user?: {
        id: number;
      };
    };
  }
}

export {};
