import {
	Body,
	Controller,
	Delete,
	Get,
	Header,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	Res
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

	constructor(
		private readonly _productsService: ProductsService
	) {
	}

	@Get()
	getAll() {
		return this._productsService.getAll();
	}

	@Get(':id')
	getOne(@Param('id') id: string) {
		return this._productsService.getById(id);
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@Header('Cache-Control', 'none')
	crate(@Body() createProductDto: CreateProductDto) {
		return this._productsService.create(createProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this._productsService.remove(id);
	}

	@Put(':id')
	update(@Body() updateProduct: UpdateProductDto, @Param('id') id: string) {
		return this._productsService.update(id, updateProduct);
	}
}
