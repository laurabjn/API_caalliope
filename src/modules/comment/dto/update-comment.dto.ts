import { PartialType } from '@nestjs/mapped-types'
import { CreateCommentDto } from './create-comment.dto'
import { ApiProperty } from '@nestjs/swagger'
<<<<<<< HEAD
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
=======
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator'
>>>>>>> 9e7921ef4701d668b593a3a2f84531df072ef303
import { Status } from './../../admin/entities/status.enum'

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({
    description: 'Content of the comment',
    example: 'This is a bad book',
    required: false
  })
  @IsString()
    content?: string

  @ApiProperty({
    description: 'Status of the book',
    example: 'accepted',
    enum: Status,
    required: false
  })
  @IsNotEmpty()
  @IsEnum(Status)
    status: Status

  @ApiProperty({
    description: 'User ID',
    example: 1,
    required: false
  })
  @IsNumber()
    userId: number

  @ApiProperty({
    description: 'Book ID',
    example: 1,
    required: false
  })
  @IsNumber()
    bookId: number
}
