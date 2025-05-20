import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostDto } from './dto/get-post.dto';
import { RedisCacheService } from 'src/cache/cache.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { sortByCreatedAtDesc } from 'src/utility/sortByCreatedAt';
import { Post } from '@prisma/client';

@Injectable()
export class PostService {
  private readonly cacheKey = 'posts';
  
  constructor(
    private readonly cache: RedisCacheService,
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
      postsData = sortByCreatedAtDesc(postsFromCache)  
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
      postsData = postDtos
    }

    return {
      message,
      data: postsData,
      statusCode: 200,
    }
  }


  async findPopularPosts() {
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
        views: "desc",
      },
      take: 10
    });

    const postDtos = GetPostDto.fromEntities(posts)

    return {
      message: "Posts retrieved successfully!",
      data: postDtos,
      success: true,
      statusCode: 200,
    }
  }

  async findRelatedPosts(currentPostId: string) {
    const currentPost = await this.prisma.post.findUnique({
      where: { id: currentPostId },
    });
  
    if (!currentPost) {
      throw new Error("Post not found");
    }
  
    const relatedPosts = await this.prisma.post.findMany({
      where: {
        id: { not: currentPostId },
        OR: [
          { category: currentPost.category },
          { tags: { hasSome: currentPost.tags } },
        ],
      },
      orderBy: {
        views: "desc",
      },
      take: 10,
    });
  
    const relatedPostIds = relatedPosts.map(post => post.id);
  
    let remainingPosts: typeof relatedPosts = [];
  
    if (relatedPosts.length < 10) {
      const needed = 10 - relatedPosts.length;
  
      remainingPosts = await this.prisma.post.findMany({
        where: {
          id: {
            notIn: [currentPostId, ...relatedPostIds],
          },
        },
        orderBy: {
          views: "desc",
        },
        take: needed,
      });
    }
  
    const finalPostIds = [...relatedPostIds, ...remainingPosts.map(p => p.id)];
  
    const enrichedPosts = await this.prisma.post.findMany({
      where: {
        id: { in: finalPostIds },
      },
      include: {
        author: true,
        content: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  
    const postDtos = GetPostDto.fromEntities(enrichedPosts);
  
    return {
      message: "Posts retrieved successfully!",
      data: postDtos,
      success: true,
      statusCode: 200,
    };
  }
  

  async findAllByAuthorId(authorId: string) {

    const postsFromCache = await this.cache.get(this.cacheKey)
    if(postsFromCache !== null){
      const posts = postsFromCache.filter((post: any) => post?.author?.id === authorId)
      if(posts?.length > 0){
        return {
          message: 'Posts retrieved from cache!',
          data: sortByCreatedAtDesc(posts)
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
      statusCode: 200,
      message: "Posts retrieved successfully",
      data: postDtos,
    }
  }

  async getLatestPosts(limit = 10) {
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

  await this.isPostExist(id)

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
    this.eventEmitter.emit('post.updated', {...postDto, _old: post });

    return {
      message: 'Post updated successfully!',
      statusCode: 200,
    };
  }

  async remove(id: string) {
    await this.isPostExist(id)

    const post = await this.prisma.post.findUnique({
      where: {
        id
      },
      include: {
        author: true,
        content: true,
      }
    });

    const postDto = GetPostDto.fromEntity(post);

    this.eventEmitter.emit('post.delete.images', postDto);

    await this.prisma.post.delete({
      where: {
        id
      }
    });

    // fire post deleted event
    this.eventEmitter.emit('post.deleted', id);

    return {
      message: 'Post deleted successfully!',
      statusCode: 200,
    }
  }

  async incrementViews(id: string){
    const isExist = await this.isPostExist(id)

    const post  = await this.prisma.post.update({
      where: {id},
      data: {
        views: {increment: 1},
        updatedAt: isExist.updatedAt
      },
      include: { author: true, content: true }
      
    })

    const updatedPost = await this.prisma.post.findUnique({
      where: { id },
      include: { author: true, content: true },
    });

    const postDto = GetPostDto.fromEntity(updatedPost);

    // fire post updated event
    this.eventEmitter.emit('post.updated', {...postDto, _old: post });

    return {
      statusCode: 200,
      success: true,
      message: "Post views incremented successfully",
      data: null
    }
  }

  async isPostExist(id: string): Promise<Post>{
    const post = await this.prisma.post.findUnique({
      where: {
        id
      },
    });

    if (!post) {
      throw new HttpException('Post was not found', HttpStatus.NOT_FOUND);
    }else{
      return post
    }
  }

}
