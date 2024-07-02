import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req, Res } from "@nestjs/common";
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// '/movies' 엔드포인트 컨트롤러
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // none endpoint
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  // query parameter 사용
  // /:id보다 밑에 있으면 search를 id로 인식해버림 (nest의 단점)
  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a movie made after : ${searchingYear}`;
  // }

  // PathVariable 사용 (url에 들어있는 값이기 때문에 타입이 string 이다.)
  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  // 모든 리소스 업데이트
  // @Put("/:id")
  // put() {
  //   return 'This will update a movie';
  // }

  // 일부 리소스 업데이트
  @Patch('/:id')
  path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId, updateData);
  }
}
