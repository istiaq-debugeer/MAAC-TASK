import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./post-model";
import { User } from "../User/user-model";
import { UserRepository } from "src/user/user-repository";
import { PostRepository } from "./post-repository";


@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository, // Inject UserRepository
    ) {}



    async createpost(postData:Partial<Post>):Promise<Post>{
       const user=await this.userRepository.singleUser(postData.user_uuid);
        if (!user){
            throw new NotFoundException('User not found');
            } 
        return this.postRepository.create(postData);
    }
    async getAllPost():Promise<Post[]>{
        return this.postRepository.findAll();
    }

    async getsinglePost(id:string):Promise<Post>{
        const post=await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;

    }

    async updatePost(id:string,PostData:Partial<Post>):Promise<Post>{
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return this.postRepository.update_post(id, PostData);
    }
    async deletPost(id:string):Promise<void>{
        await this.postRepository.delete(id);
    }




}