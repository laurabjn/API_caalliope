import { PartialType } from '@nestjs/mapped-types'
import { CreateCommentDto } from './create-comment.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Status } from 'src/modules/admin/entities/status.enum'

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a bad book',
    required: false
  })
  @IsString()
    content?: string

  @ApiProperty({
    description: 'Rating of the comment',
    example: 1,
    required: false
  })
  @IsNumber()
    rating?: number

  @ApiProperty({
    description: 'Status of the book',
    example: 'reading',
    enum: Status,
    required: false
  })
  @IsNotEmpty()
  @IsEnum(Status)
    status: Status
}
