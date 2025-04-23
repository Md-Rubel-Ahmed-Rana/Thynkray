import { ConfigService } from '@nestjs/config';
import  MeiliSearch  from 'meilisearch'

const configService = new ConfigService();

export const MeiliSearchClient = new MeiliSearch({
  host: configService.get<string>('MEILISEARCH_HOST'),   
  apiKey: configService.get<string>('MEILISEARCH_API_KEY'), 
});

