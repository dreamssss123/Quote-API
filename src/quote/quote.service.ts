import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>
  ) {}
  
  create(createQuoteDto: CreateQuoteDto) {
    // return 'This action adds a new quote';
    return this.quoteRepository.save(createQuoteDto);
  }

  findAll(): Promise<Quote[]> {
    return this.quoteRepository.find({
      order: {
        created_at: 'DESC', 
      },
    });
  }

  findOne(id: number): Promise<Quote | null> {
    return this.quoteRepository.findOneBy({ id });
  }

  update(id: number, updateQuoteDto: UpdateQuoteDto) {
    // return `This action updates a #${id} quote`;
    return this.quoteRepository.update(id, updateQuoteDto);
  }

  async remove(id: string): Promise<void> {
    await this.quoteRepository.delete(id);
  }

  async findOneByTextz(textz: string): Promise<Quote | null> {
    // console.log('+++++++++++++++++++++++++++++');
    return this.quoteRepository.findOneBy({ textz: textz });
  }

  async findLike(search: string, sortz: any) {
    // console.log('+++++++++++++++++++++++++++++');
    // console.log(search);
    // console.log(sortz);
    return this.quoteRepository.find({
      where: {
        textz: Like(`%${search}%`), // Case-sensitive "contains" // or // propertyName: ILike(`%${keyword}%`), // Case-insensitive "contains"
      },
      order: {
        created_at: sortz,
      }
    });
    // return [{sdssdsdad: 123}];
  }
}
