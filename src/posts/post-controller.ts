import { Controller,Post,Get,Put,Delete,Body,Param,Request  } from "@nestjs/common";
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
  async update(@Param('id') id: string, @Body() postData: Partial<postModel>, @Request() req): Promise<postModel> {
      return this.postService.updatePost(id, postData, req.user.id); // Assuming req.user.id contains the authenticated user's ID
  }

@Delete(':id')
async remove(@Param('id') id: string, @Request() req): Promise<void> {
    return this.postService.deletePost(id, req.user.id);
}
}

