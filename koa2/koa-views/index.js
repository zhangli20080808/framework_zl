const views = (dirname,{map}) => {
  return async (ctx, next) => {
    ctx.render = async (fileName, data) => {};
    await next()
  };
};