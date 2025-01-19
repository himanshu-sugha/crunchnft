# bitsCrunch Project

This project uses the bitsCrunch UnleashNFTs API V2 to fetch NFT-related data.

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your API key and port:
   ```properties
   PORT=3000
   API_KEY=your_api_key_here
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Fetch NFT Collection
- **URL**: `/api/nfts/collection`
- **Method**: `GET`
- **Description**: Fetches the NFT collection data.
- **Query Parameters**:
  - `metrics`: The metrics to include in the response.
  - `sort_by`: The field to sort the results by.

### Fetch Specific NFT Details
- **URL**: `/api/nfts/nft/:blockchain/:address/:token`
- **Method**: `GET`
- **Description**: Fetches details of a specific NFT by blockchain, contract address, and token ID.

### Fetch Paginated List of NFTs
- **URL**: `/api/nfts`
- **Method**: `GET`
- **Description**: Fetches a paginated, sorted list of NFTs and metrics.
- **Query Parameters**:
  - `metrics`: The metrics to include in the response.
  - `sort_by`: The field to sort the results by.
  - `page`: The page number to fetch.
  - `limit`: The number of results per page.
  - `price_min`: The minimum price to filter the results by.
  - `price_max`: The maximum price to filter the results by.

### Fetch NFT Metrics
- **URL**: `/api/nfts/nft/:blockchain/:address/:token/metrics`
- **Method**: `GET`
- **Description**: Fetches metrics of a specific NFT by blockchain, contract address, and token ID.
- **Query Parameters**:
  - `metrics`: The metrics to include in the response.
