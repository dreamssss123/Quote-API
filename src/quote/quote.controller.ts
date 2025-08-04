import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { jwtConstants } from 'src/auth/constants';

export type User2 = any;

@Controller('quote')
export class QuoteController {
  
  private readonly users2: User2[];

  constructor(private readonly quoteService: QuoteService) {
    this.users2 = jwtConstants.data_user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.create(createQuoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    // console.log('----------------');
    let datasz = await this.quoteService.findAll();
    // console.log(datasz);

    let data_users = this.users2;
    // console.log(data_users);
    for( let i=0; i<datasz.length; i++ ){
      let data1 = datasz[i];
      // datasz[i]['zzzzzzzzz'] = 1;
      // console.log(data1);
      
      for( let ii=0; ii<data_users.length; ii++ ){
        let user1 = data_users[ii];
        // console.log(user1);
        if( user1.id==data1.created_by ){
          datasz[i]['created_by_name'] = user1.username;
        }

        if( data1.voted_by!=null && data1.voted_by==user1.id ){
          datasz[i]['voted_name'] = user1.username;
        }
      }

    }
    return datasz;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    // console.log(555555555555);
    // console.log(id);
    return this.quoteService.update(+id, updateQuoteDto);
    // return {dasd: 4545};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quoteService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/findbytext/:textz')
  findByTextz(@Param('textz') textz: string) {
    // console.log('----------------------------');
    // console.log(textz);
    return this.quoteService.findOneByTextz(textz);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/new_search/findlike')
  async findLike(@Body('search') search: string, @Body('sortz') sortz: string) {
    // console.log('--------------------------');
    // console.log(search); // Logs the entire query object, e.g., { category: 'electronics', limit: '10' }
    // console.log(sortz);
    // return `Fetching items with query: ${JSON.stringify(query)}`;
    let datasz = await this.quoteService.findLike(search, sortz);
    // console.log(datasz);
    let data_users = this.users2;
    // console.log(data_users);
    for( let i=0; i<datasz.length; i++ ){
      let data1 = datasz[i];
      // datasz[i]['zzzzzzzzz'] = 1;
      // console.log(data1);
      
      for( let ii=0; ii<data_users.length; ii++ ){
        let user1 = data_users[ii];
        // console.log(user1);
        if( user1.id==data1.created_by ){
          datasz[i]['created_by_name'] = user1.username;
        }

        if( data1.voted_by!=null && data1.voted_by==user1.id ){
          datasz[i]['voted_name'] = user1.username;
        }
      }

    }

    return datasz;
  }
}
