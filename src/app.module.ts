import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { QuoteModule } from './quote/quote.module';
import { Quote } from './quote/entities/quote.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      host: 'mysql_dbzz',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs',
      entities: [User, Quote],
      synchronize: true,
    }),
    // UsersModule,
    QuoteModule,
    AuthModule,
    // TypeOrmModule.forFeature([User])
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
