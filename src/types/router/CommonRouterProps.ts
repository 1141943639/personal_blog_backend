import Router from 'koa-router';
import { validTokenOpt } from 'types/middleware/ValidTokenProps';

export interface CommonRouterOpt extends Router.IRouterOptions, validTokenOpt {}
