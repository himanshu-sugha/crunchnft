const express = require('express');
const { getNFTCollection, getNFTDetails, getNFTs, getNFTMetrics } = require('../controllers/nftController');

const router = express.Router();

// Route to fetch NFT collection
router.get('/collection', getNFTCollection);

// Route to fetch specific NFT details
router.get('/nft/:blockchain/:address/:token', getNFTDetails);

// Route to fetch paginated list of NFTs
router.get('/nfts', getNFTs);

// Route to fetch NFT metrics
router.get('/nft/:blockchain/:address/:token/metrics', getNFTMetrics);

module.exports = router;
