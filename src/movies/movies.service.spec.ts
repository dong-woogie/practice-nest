import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);

    service.create({
      title: 'TEST',
      year: 2020,
      genres: ['test'],
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('getOne', () => {
    it('should return a movie', () => {
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
  });
  describe('create', () => {
    it('should create movie', () => {
      service.create({
        title: 'create test',
        year: 2020,
        genres: ['create', 'test'],
      });
      const movies = service.getAll();
      expect(movies.length).toEqual(2);
      expect(movies[1].id).toEqual(2);
    });
  });
  describe('delete', () => {
    // const movie = service.getOne(1);
    it('movies length after delete movie id 1', () => {
      const movies = service.getAll();
      expect(1).toEqual(movies.length);

      service.deleteOne(1);
      const newMovies = service.getAll();
      expect(0).toEqual(newMovies.length);
    });
  });
  describe('update', () => {
    it('movie update title', () => {
      service.update(1, { title: 'Update TEST' });
      const movie = service.getOne(1);

      expect('Update TEST').toEqual(movie.title);
    });
  });
});
