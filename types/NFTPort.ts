interface NFTMetadata {
  name: string;
  image: string;
  description: string;
}

export interface NFTData {
  cached_file_url?: string;
  metadata?: NFTMetadata;
  contract_address: string;
  token_id: string;
}
