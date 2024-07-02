import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {
  @IsString() // string인지 검사
  readonly title: string;
  @IsNumber() // number인지 검사
  readonly year: number;
  @IsOptional() // 선택적 속성
  @IsString({ each: true }) // 모든 요소 검사
  readonly genres: string[];
}
