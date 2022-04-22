import { Soon } from '../src/index';

describe('getRankingByCollections', () => {

  const soon = new Soon();

  it('works', async () => {

    await soon.getRankingByCollections(['0xa60d33c3787e1e17a8df4ba16f4429317fa53327', '0xde4db263927677ac45e9d7a1f02de434fbad016b'], 55).then((res: any) => {
      console.log(res);
    });
  }, 50000);
});
