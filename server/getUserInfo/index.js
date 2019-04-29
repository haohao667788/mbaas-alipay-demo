'use strict';

module.exports = async (ctx) => {
  const user = await ctx.basement.openapi.alipay.exec('alipay.user.info.share');

  return user;
};
