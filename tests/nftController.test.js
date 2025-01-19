const { getNFTCollection, getNFTDetails, getNFTs, getNFTMetrics } = require('../src/controllers/nftController');
const axios = require('axios');

jest.mock('axios');

describe('NFT Controller', () => {
  const req = {
    query: {
      metrics: 'price_avg',
      sort_by: 'price_avg',
      page: 1,
      limit: 10,
    },
    params: {
      blockchain: '1',
      address: '0x1234567890abcdef',
      token: '1',
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  it('should fetch NFT collection data', async () => {
    axios.get.mockResolvedValue({ data: { success: true } });
    await getNFTCollection(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should fetch specific NFT details', async () => {
    axios.get.mockResolvedValue({ data: { success: true } });
    await getNFTDetails(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should fetch paginated list of NFTs', async () => {
    axios.get.mockResolvedValue({ data: { success: true } });
    await getNFTs(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  it('should fetch NFT metrics', async () => {
    axios.get.mockResolvedValue({ data: { success: true } });
    await getNFTMetrics(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});
