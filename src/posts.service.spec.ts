import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', () => {
      const post = { text: 'Test post' };
      const createdPost = service.create(post);

      expect(createdPost).toMatchObject({
        id: '1',
        text: 'Test post',
      });
      expect(createdPost.date).toBeDefined();
    });

    it('should increment the lastPostId after creating a post', () => {
      const post1 = { text: 'Test post 1' };
      const post2 = { text: 'Test post 2' };
      const createdPost1 = service.create(post1);
      const createdPost2 = service.create(post2);

      expect(createdPost1.id).toBe('1');
      expect(createdPost2.id).toBe('2');
    });
  });

  describe('find', () => {
    it('should find a post by id', () => {
      const post = { text: 'Test post' };
      const createdPost = service.create(post);
      const foundPost = service.find(createdPost.id);

      expect(foundPost).toEqual(createdPost);
    });

    it('should return undefined if post is not found', () => {
      const foundPost = service.find('999');

      expect(foundPost).toBeUndefined();
    });
  });
});