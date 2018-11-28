export const assertNever = (never: never) => console.log('Never reached');

export const serializeError = (error: Error) =>
  JSON.stringify(error, Object.getOwnPropertyNames(error));
