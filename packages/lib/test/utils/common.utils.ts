
export const expectThrow = async <C, E>(call: Promise<C>, msg: string) => {
  try {
    await call;
    fail();
  } catch (e: any) {
    expect(e.message).toBe(msg);
  }
};

export const uuid = (length = 42) => {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};