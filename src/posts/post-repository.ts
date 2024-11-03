import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post-model'; 

@Injectable()
export class PostRepository {
    constructor(
        @InjectModel(Post)
        private postModel: typeof Post,
    ) {}

    async create(postData: Partial<Post>): Promise<Post> {
        return this.postModel.create(postData);
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.findAll();
    }

    async findById(id: string): Promise<Post> {
        return this.postModel.findByPk(id);
    }

    async update_post(id: string, PostData: Partial<Post>): Promise<Post> {
        await this.postModel.update(PostData, { where: { id } });
        return this.findById(id);
    }

    async delete(id: string): Promise<void> {
        await this.postModel.destroy({ where: { id } });
    }
}
