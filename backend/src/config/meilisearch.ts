import 'dotenv/config';
import MeiliSearch from 'meilisearch';

export const MeiliSearchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST!,
  apiKey: process.env.MEILISEARCH_API_KEY!,
});
