import { Controller,Post,Get,Put,Delete,Body,Param,Request,Headers  } from "@nestjs/common";
import { PostService } from "./post-service";
import { Post as postModel } from "./post-model";




@Controller('/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() postData: Partial<postModel>): Promise<postModel> {
    return this.postService.createpost(postData);
  }

  @Get()
  async findAll(): Promise<postModel[]> {
    return this.postService.getAllPost();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<postModel> {
    return this.postService.getsinglePost(id);
  }

  @Put(':id')
    async updatePost(
        @Param('id') id: string,
        @Body() postData: Partial<postModel>,
        @Headers('Authorization') authHeader: string
    ) {
        const jwtToken = authHeader.replace('Bearer ', '');

        const userId = await this.postService.validateToken(jwtToken);
        return this.postService.updatePost(id, postData, jwtToken);
    }

    @Delete(':id')
    async deletePost(
        @Param('id') id: string,
        @Headers('Authorization') authHeader: string
    ) {
        const jwtToken = authHeader.replace('Bearer ', '');
        return this.postService.deletePost(id, jwtToken);
    }
}

