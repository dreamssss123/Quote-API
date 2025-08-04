import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
import { jwtConstants } from 'src/auth/constants';

export type User2 = any;

@Injectable()
export class UsersService {
    private readonly users2: User2[];

    constructor(
        // @InjectRepository(User)
        // private usersRepository: Repository<User>,
    ){
        this.users2 = jwtConstants.data_user;
        // this.users2 = [
        //     {
        //         id: "1",
        //         username: "somchai@mail.com",
        //         password: "123456"
        //     },
        //     {
        //         id: "2",
        //         username: "smilegirl@mail.com",
        //         password: "123456"
        //     },
        //     {
        //         id: "10",
        //         username: "makmee@mail.com",
        //         password: "123456"
        //     }
        // ];
    }

    async findOne2(username: string): Promise<User2 | undefined> {
        return this.users2.find(user => user.username === username);
    }

    // create(createUserDto: CreateUserDto) {
    //     // return 'This action adds a new user';
    //     return this.usersRepository.save(createUserDto);
    // }

    // findAll(): Promise<User[]> {
    //     return this.usersRepository.find();
    // }

    // findOne(id: number): Promise<User | null> {
    //     return this.usersRepository.findOneBy({ id });
    // }

    // update(id: number, updateUserDto: UpdateUserDto) {
    // // return `This action updates a #${id} user`;
    //     return this.usersRepository.update(id, updateUserDto);
    // }

    // async remove(id: string): Promise<void> {
    //     await this.usersRepository.delete(id);
    // }
}

