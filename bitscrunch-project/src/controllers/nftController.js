const axios = require('axios');
const axiosRetry = require('axios-retry');

// Configure axios to retry requests
axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

const validMetrics = [
  'assets', 'assets_change', 'holders', 'holders_change', 'holders_diamond_hands', 'holders_diamond_hands_change',
  'holders_sharks', 'holders_sharks_change', 'holders_tokens_1', 'holders_tokens_2', 'holders_tokens_3_5',
  'holders_tokens_6_9', 'holders_tokens_10_15', 'holders_tokens_16_25', 'holders_tokens_9plus', 'holders_tokens_25plus',
  'marketcap', 'marketcap_change', 'price_avg', 'price_avg_change', 'price_ceiling', 'floor_price', 'sales', 'sales_change',
  'traders', 'traders_change', 'traders_ratio', 'traders_ratio_change', 'traders_buyers', 'traders_buyers_change',
  'traders_sellers', 'traders_sellers_change', 'transactions', 'transactions_change', 'transfers', 'transfers_change',
  'volume', 'volume_change', 'washtrade_assets', 'washtrade_assets_change', 'washtrade_level', 'washtrade_suspect_sales',
  'washtrade_suspect_sales_change', 'washtrade_volume', 'washtrade_volume_change', 'washtrade_wallets', 'washtrade_wallets_change',
  'whales', 'whales_change', 'sharks', 'whales_transactions', 'sharks_transactions', 'historic_holders', 'minting_revenue',
  'royalty_revenue', 'floor_price_eth'
];

const validSortBy = [
  'holders', 'holders_change', 'marketcap', 'marketcap_change', 'price_avg', 'price_avg_change', 'price_ceiling', 'floor_price',
  'sales', 'sales_change', 'traders', 'traders_change', 'traders_ratio', 'traders_ratio_change', 'traders_buyers', 'traders_buyers_change',
  'traders_sellers', 'traders_sellers_change', 'transactions', 'transactions_change', 'transfers', 'transfers_change', 'volume',
  'volume_change', 'washtrade_assets', 'washtrade_assets_change', 'washtrade_level', 'washtrade_suspect_sales', 'washtrade_suspect_sales_change',
  'washtrade_volume', 'washtrade_volume_change', 'washtrade_wallets', 'washtrade_wallets_change', 'collection_name', 'whales', 'whales_change',
  'sharks', 'whales_transactions', 'sharks_transactions', 'contract_created_date', 'floor_price', 'floor_price_eth'
];

const getNFTCollection = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const { metrics, sort_by } = req.query; // Include metrics and sort_by in query parameters
    if (!API_KEY) {
      throw new Error('API key is missing');
    }
    if (!metrics || !sort_by) {
      throw new Error('Metrics and sort_by parameters are missing');
    }
    if (!validMetrics.includes(metrics)) {
      throw new Error(`Invalid metrics parameter. Allowed values are: ${validMetrics.join(', ')}`);
    }
    if (!validSortBy.includes(sort_by)) {
      throw new Error(`Invalid sort_by parameter. Allowed values are: ${validSortBy.join(', ')}`);
    }
    console.log('Using API Key:', API_KEY); // Log the API key to verify it's being read correctly
    const url = `https://api.unleashnfts.com/api/v1/collections?metrics=${encodeURIComponent(metrics)}&sort_by=${encodeURIComponent(sort_by)}`; // Updated URL with URL encoding

    const headers = {
      'x-api-key': API_KEY, // Using the correct header format
    };
    console.log('Request Headers:', headers); // Log the request headers

    const response = await axios.get(url, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching NFT collection data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch NFT collection data' });
  }
};

const getNFTDetails = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const { blockchain, address, token } = req.params;
    if (!API_KEY) {
      throw new Error('API key is missing');
    }
    const url = `https://api.unleashnfts.com/api/v1/nft/${blockchain}/${address}/${token}`; // Endpoint for specific NFT details

    const headers = {
      'x-api-key': API_KEY,
    };

    const response = await axios.get(url, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 422) {
      console.error('Validation error:', error.response.data);
      res.status(422).json({ error: 'Validation error', details: error.response.data });
    } else {
      console.error('Error fetching NFT details:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to fetch NFT details' });
    }
  }
};

const getNFTs = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const { metrics, sort_by, page = 1, limit = 10, price_min, price_max } = req.query; // Include pagination and filtering parameters
    if (!API_KEY) {
      throw new Error('API key is missing');
    }
    if (!metrics || !sort_by) {
      throw new Error('Metrics and sort_by parameters are missing');
    }
    if (!validMetrics.includes(metrics)) {
      throw new Error(`Invalid metrics parameter. Allowed values are: ${validMetrics.join(', ')}`);
    }
    if (!validSortBy.includes(sort_by)) {
      throw new Error(`Invalid sort_by parameter. Allowed values are: ${validSortBy.join(', ')}`);
    }
    let url = `https://api.unleashnfts.com/api/v1/nfts?metrics=${encodeURIComponent(metrics)}&sort_by=${encodeURIComponent(sort_by)}&page=${page}&limit=${limit}`; // Updated URL with pagination
    if (price_min) {
      url += `&price_min=${price_min}`;
    }
    if (price_max) {
      url += `&price_max=${price_max}`;
    }

    const headers = {
      'x-api-key': API_KEY,
    };

    const response = await axios.get(url, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching NFTs:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch NFTs' });
  }
};

const getNFTMetrics = async (req, res) => {
  try {
    const API_KEY = process.env.API_KEY;
    const { blockchain, address, token } = req.params;
    const { metrics } = req.query; // Include metrics in query parameters
    if (!API_KEY) {
      throw new Error('API key is missing');
    }
    if (!metrics) {
      throw new Error('Metrics parameter is missing');
    }
    if (!validMetrics.includes(metrics)) {
      throw new Error(`Invalid metrics parameter. Allowed values are: ${validMetrics.join(', ')}`);
    }
    const url = `https://api.unleashnfts.com/api/v1/nft/${blockchain}/${address}/${token}/metrics?metrics=${encodeURIComponent(metrics)}`; // Endpoint for NFT metrics with URL encoding

    const headers = {
      'x-api-key': API_KEY,
    };

    const response = await axios.get(url, { headers });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching NFT metrics:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch NFT metrics', details: error.response ? error.response.data : error.message });
  }
};

module.exports = { getNFTCollection, getNFTDetails, getNFTs, getNFTMetrics };

