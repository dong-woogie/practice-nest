import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(readonly moviesService: MoviesService) {}
  @Get()
  getMovies() {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getMovie(@Param('id') movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch('/:id')
  patchMovie(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
    return this.moviesService.update(movieId, movieData);
  }
}
