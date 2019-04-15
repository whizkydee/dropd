const getPath = event =>
  event && event instanceof UIEvent
    ? event.path || (event.composedPath && event.composedPath())
    : undefined

const isDropdElem = (ctx, ref) =>
  ctx && (ctx.indexOf(ref) !== -1 && ctx !== ref)

export { getPath, isDropdElem }
