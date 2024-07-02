import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  // 테스트 하기 전 실행
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });
  // 정의 되어야 함.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array.', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // type이 array인지 체크
    });
  });

  describe('getOne()', () => {
    it('should return a movie.', () => {
      service.create({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined(); // 정의가 되었는가
      expect(movie.id).toEqual(1); // 1과 같은가.
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID 999 Not Found`);
      }
    });
  });

  describe('deleteOne()', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });
      const allMovies = service.getAll().length; // 1
      service.deleteOne(1);
      const afterDelete = service.getAll().length; // 0
      expect(afterDelete).toBeLessThan(allMovies);
    });
  });
  it('should return 404 error', () => {
    try {
      service.deleteOne(999);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test movie',
        genres: ['Test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });

    it('should return a 404', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
