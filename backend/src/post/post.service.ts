import { GoogleDriveService } from 'src/file-uploader/google.drive.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { RedisCacheService } from 'src/cache/cache.service';
import compareArrayAndReturnUnmatched from 'src/utility/compareArray';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostService {
  private readonly cacheKey = 'posts';
  
  constructor(
    private readonly cache: RedisCacheService,
    private readonly googleDriveService: GoogleDriveService, 
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createPostDto: CreatePostDto) {
    const {title, slug, tags, content, category, thumbnail, authorId, description} = createPostDto;
   await this.prisma.post.create({data: {
      title,
      slug,
      tags,
      category,
      thumbnail,
      authorId,
      description,
      content: {
        create: content.map((section) => ({
          title: section.title,
          images: section.images,
          description: section.description,
        })),  
      },
    }});

    const post = await this.prisma.post.findUnique({
      where: {
        slug
      },
      include: {
        author: true,
        content: true,
      }
    })

    
    const postDto = GetPostDto.fromEntity(post);

    // fire post created event
    this.eventEmitter.emit('post.created', postDto);

    return {
      message: 'Post created successfully!',
      statusCode: 201,
    }
  }

  async findAll() {
    let postsData = []
    let message = 'Posts retrieved successfully!'
    const postsFromCache = await this.cache.get(this.cacheKey)
    if(postsFromCache !== null && postsFromCache){
      postsData = postsFromCache
      message = 'Posts retrieved from cache!'
    }else{
      const posts = await this.prisma.post.findMany({
          include: {
            author: true,
            content: true,
             _count: {
              select: {
                comments: true
              }
             }
          },
          orderBy: {
            createdAt: "desc"
          }
        });
      const postDtos = GetPostDto.fromEntities(posts)
      await this.cache.set(this.cacheKey, postDtos)
      postsData = postDtos
    }

    return {
      message,
      data: postsData,
      statusCode: 200,
    }
  }

  async findAllByAuthorId(authorId: string) {

    const postsFromCache = await this.cache.get(this.cacheKey)
    if(postsFromCache !== null){
      const posts = postsFromCache.filter((post: any) => post?.author?.id === authorId)
      if(posts?.length > 0){
        return {
          message: 'Posts retrieved from cache!',
          data: posts
        }
      }
    }

    const posts =await this.prisma.post.findMany({
      where: {
        authorId: authorId
      },
      include: {
        author: true,
        content: true,
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    const postDtos = GetPostDto.fromEntities(posts)
    return {
      message: "Posts retrieved successfully",
      data: postDtos,
       statusCode: 200,
    }
  }

  async getLatestPosts(limit = 5) {
    const latestPosts = await this.prisma.post.findMany({
       include: {
        author: true,
        content: true
       },
        take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

     const postDtos = GetPostDto.fromEntities(latestPosts)

    return {
      message: "Latest posts fetched successfully!",
      statusCode: 200,
      data: postDtos
    }
  }

  async getPostsByCategory(category: string) {
    const categorizedPosts = await this.prisma.post.findMany({
      where: {
        category: category
      },
       include: {
        author: true,
        content: true
       },
      orderBy: {
        createdAt: 'desc',
      },
    });


     const postDtos = GetPostDto.fromEntities(categorizedPosts)

    return {
      message: "Categorized posts fetched successfully!",
      statusCode: 200,
      data: postDtos
    }
  }

 
 async findOne(id: string) {
    const posts = await this.cache.get(this.cacheKey) as GetPostDto[]
    const postFromCache = posts.find((post) => post?.id === id)

    if(postFromCache !== null && postFromCache){
      return {
        message: 'Post retrieved from cache successfully!',
        data: postFromCache,
         statusCode: 200,
      }
    }

    const post = await this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        author: true,
        content: true,
        _count: {
          select: {
            comments: true
          }
        }
      }
    });
    
    if (!post) {
       throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }
    
    const postDto = GetPostDto.fromEntity(post);

    return {
      message: 'Post retrieved successfully!',
      data: postDto,
       statusCode: 200,
    };
  }

 async findOneBySlug(slug: string) {
    const posts = await this.cache.get(this.cacheKey) as GetPostDto[]
    const postFromCache = posts.find((post) => post?.slug === slug)

    if(postFromCache !== null && postFromCache){
      return {
        message: 'Post retrieved from cache successfully!',
        data: postFromCache,
         statusCode: 200,
      }
    }

    const post = await this.prisma.post.findUnique({
      where: {
        slug
      },
      include: {
        author: true,
        content: true,
      }
    });
    if (!post) {
       throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }

    const postDto = GetPostDto.fromEntity(post);

    return {
      message: 'Post retrieved successfully!',
      data: postDto,
       statusCode: 200,
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
  const { title, slug, tags, content, category, thumbnail, description } = updatePostDto;

  const oldContent = content.filter(section => section?.id);
  const newContent = content.filter(section => !section?.id);

    const post = await this.prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        tags,
        category,
        thumbnail,
        description,
      }
    });

    await Promise.all(
      oldContent.map(section =>
        this.prisma.postSection.update({
          where: { id: section.id },
          data: {
            title: section.title,
            images: section.images,
            description: section.description,
          },
        })
      )
    );

    if (newContent.length > 0) {
      await this.prisma.postSection.createMany({
        data: newContent.map(section => ({
          title: section.title,
          images: section.images,
          description: section.description,
          postId: post.id,
        })),
      });
    }

    const updatedPost = await this.prisma.post.findUnique({
      where: { id: post.id },
      include: { author: true, content: true },
    });

    const postDto = GetPostDto.fromEntity(updatedPost);

    // fire post updated event
    this.eventEmitter.emit('post.updated', postDto);



    // 6️⃣ Delete removed images
    const oldImages = postDto.content.map(s => s.images).flat();
    const newImages = content.map(s => s.images).flat();
    const imagesToDelete = compareArrayAndReturnUnmatched(
      [...oldImages, postDto.thumbnail],
      [...newImages, thumbnail]
    );

    if (imagesToDelete.length > 0) {
      await this.googleDriveService.deleteMultipleFiles(imagesToDelete);
    }

    return {
      message: 'Post updated successfully!',
      statusCode: 200,
    };
  }

  async remove(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id
      }
    });

    if (!post) {
      throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }

    await this.prisma.post.delete({
      where: {
        id
      }
    });
    

    const postDto = GetPostDto.fromEntity(post);

    // fire post deleted event
    this.eventEmitter.emit('post.deleted', id);

    // delete images from drive
    const imagesToDelete = [postDto?.thumbnail, ...postDto.content.map((section) => section.images).flat()]

    if(imagesToDelete.length > 0){
       this.googleDriveService.deleteMultipleFiles(imagesToDelete)
    }

    return {
      message: 'Post deleted successfully!',
      statusCode: 200,
    }
  }

}
