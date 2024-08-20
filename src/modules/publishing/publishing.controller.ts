import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PublishingService } from './publishing.service'
import { CreatePublishingDto } from './dto/create-publishing.dto'
import { UpdatePublishingDto } from './dto/update-publishing.dto'
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { Publishing } from './entities/publishing.entity'

@ApiBearerAuth()
@ApiTags('publishing')
@Controller('publishing')
export class PublishingController {
  constructor (private readonly publishingService: PublishingService) {}

  @Post()
  @ApiOperation({ summary: 'Create publishing' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Publishing
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create (@Body() createPublishingDto: CreatePublishingDto): Promise<any> {
    try {
      const publishing = await this.publishingService.create(createPublishingDto)
      return {
        success: true,
        message: 'Publishing Created Successfully',
        data: publishing
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all publishing' })
  @ApiCreatedResponse({
    description: 'Publishing Fetched Successfully',
    type: [Publishing]
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findAll (): Promise<any> {
    try {
      const data = await this.publishingService.findAll()
      return {
        success: true,
        data,
        message: 'Publishing Fetched Successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get publishing by id' })
  @ApiCreatedResponse({
    description: 'Publishing Fetched Successfully',
    type: Publishing
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async findOne (@Param('id') id: string): Promise<any> {
    try {
      const data = await this.publishingService.findOne(+id)
      return {
        success: true,
        data,
        message: 'Publishing Fetched Successfully'
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update publishing' })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: Publishing
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Author Not Found' })
  async update (@Param('id') id: string, @Body() updatePublishingDto: UpdatePublishingDto): Promise<any> {
    try {
      const publishing = await this.publishingService.update(+id, updatePublishingDto)
      return {
        success: true,
        message: 'Publishing Updated Successfully',
        data: publishing
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete publishing' })
  @ApiCreatedResponse({
    description: 'The record has been successfully removed.',
    type: Publishing
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Author Not Found' })
  async remove (@Param('id') id: string): Promise<any> {
    try {
      const publishing = await this.publishingService.remove(+id)
      return {
        success: true,
        message: 'Publishing Removed Successfully',
        data: publishing
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
