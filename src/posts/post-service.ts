import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./post-model";
import { User } from "../User/user-model";
import { UserRepository } from "src/User/user-repository";
import { PostRepository } from "./post-repository";


@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository, 
    ) {}



    async createpost(postData:Partial<Post>):Promise<Post>{
       const user=await this.userRepository.findById(postData.user_uuid);
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

    async updatePost(id: string, postData: Partial<Post>, userId: string): Promise<Post> {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
       
        if (post.user_uuid !== userId) {
            throw new UnauthorizedException('You are not authorized to edit this post');
        }
        return this.postRepository.update_post(id, postData);
    }
    
    
    async deletePost(id: string, userId: string): Promise<void> {
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        
        if (post.user_uuid !== userId) {
            throw new UnauthorizedException('You are not authorized to delete this post');
        }
        await this.postRepository.delete(id);
    
    


    }
}