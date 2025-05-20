import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { GetQuoteDto } from './dto/get-quote.dto';

@Injectable()
export class QuotesService {
  private readonly quotes = [
    {
        id: uuidv4(),
        quote: "I have never met a woman who works who doesn't feel guilty. I mean we all deny it like crazy but deep down there is always that voice saying you should be at home.",
        author: "Kristin Scott Thomas",
    },
    {
        id: uuidv4(),
        quote: "High moral character is not a precondition for great moral accomplishments.",
        author: "Christopher Hitchens",
    },
    {
        id: uuidv4(),
        quote: "Happiness is a hard master, particularly other people's happiness.",
        author: "Aldous Huxley",
    },
    {
        id: uuidv4(),
        quote: "My theory is that all of Scottish cuisine is based on a dare.",
        author: "Mike Myers",
    },
    {
        id: uuidv4(),
        quote: "I realized women and humor were linked very closely.",
        author: "Craig Ferguson",
    },
    {
        id: uuidv4(),
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
    }
  ]
  private readonly url = 'https://api.api-ninjas.com/v1/quotes';
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  async findQuotes() {
    const apiKey = this.configService.get<string>('QUOTE_API_KEY');
    try {
      const quoteRequests = Array.from({ length: 6 }, () =>
        this.httpService.axiosRef.get(`${this.url}`, {
          headers: {
            'X-Api-Key': apiKey,
          },
        })
      );
      const responses = await Promise.all(quoteRequests);
      const quotes = responses.map((res) => res.data[0]); 

      const quotesWithIds: GetQuoteDto[] = quotes.map((quote) => ({id: uuidv4(), author: quote.author, quote: quote.quote}))

      return {
        statusCode: 200,
        success: true,
        message: 'Quotes retrieved successfully',
        data: quotesWithIds,
      };
    } catch (error: any) {
      console.error('Quote API failed. Falling back to local quotes:', error.message);
      return {
        statusCode: 200,
        success: true,
        message: 'Quotes retrieved from fallback source',
        data: this.quotes,
      };
    }
  }
}
