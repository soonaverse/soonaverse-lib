export const uuid = () => Math.random().toString().slice(2, -1);

export const expectThrow = async <C, E>(call: Promise<C>, msg: string) => {
  try {
    await call;
    fail();
  } catch (e: any) {
    expect(e.message).toBe(msg);
  }
};
