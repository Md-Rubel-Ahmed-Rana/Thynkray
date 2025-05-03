import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GetGlobalNewsDto } from './dto/get-global-new.dto';
import  NewsAPI from 'newsapi'
import { GlobalNews } from './entities/global-news.entity';

@Injectable()
export class GlobalNewsService {
  private readonly newsapi = new NewsAPI('9b1009f0c7734fad829a5805999fabbd');

  async findAll(query: GetGlobalNewsDto) {
    try {
      const response = await this.newsapi.v2.topHeadlines({
        category: query.category,
        language: 'en',
        country: query.country || 'us',  
        pageSize: query.pageSize || 10,
        page: query.page || 1,
      });

      if (response.status !== 'ok') {
        throw new HttpException('Failed to fetch news', HttpStatus.BAD_REQUEST);
      }

      const news: GlobalNews[] = response.articles.map((article: any) => ({
        source: {
          id: article.source.id,
          name: article.source.name,
        },
        author: article.author,
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage,
        publishedAt: article.publishedAt,
      }));

      return {
        statusCode: 200,
        message: "International news retrieved successfully",
        data: news
      }

    } catch (error: any) {
      throw new HttpException(error?.message || 'News API error', HttpStatus.BAD_REQUEST);
    }
  }
}
