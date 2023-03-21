export interface validTokenOpt {
  // 传入路径数组来忽略接口, 或者传入 * 来忽略所有
  unauthorizedInterface?: string[] | '*';
}
