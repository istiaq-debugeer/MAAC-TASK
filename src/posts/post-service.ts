import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./post-model";
import { User } from "../User/user-model";
import { UserRepository } from "src/User/user-repository";
import { PostRepository } from "./post-repository";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        private userRepository: UserRepository, 
        private readonly jwtService: JwtService,
    ) {}

    async validateToken(token: string): Promise<string> {
    try {
        const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        return payload.sub; // or any identifier you need
    } catch (error) {
        throw new UnauthorizedException('Invalid token');
    }
}

    async createpost(postData:Partial<Post>):Promise<Post>{
       const user=await this.userRepository.findByIdOrUsername(postData.user_uuid);
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

    async updatePost(id: string, postData: Partial<Post>, jwtToken: string): Promise<Post> {
        const { userId } = this.jwtService.verify(jwtToken);
        
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.user_uuid !== userId) {
            throw new UnauthorizedException('You are not authorized to edit this post');
        }

        return this.postRepository.update_post(id, postData);
    }
    
    async deletePost(id: string, jwtToken: string): Promise<void> {
        const { userId } = this.jwtService.verify(jwtToken);
        
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
