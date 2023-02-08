import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Product, ProductDocument } from './schemas/product.schema';


@Injectable()
export class ProductsService {
	private products = [];

	constructor(
		@InjectModel(Product.name) private _productModel: Model<ProductDocument>
	) {
	}


	async getAll() {
		return this._productModel.find()
	}

	async getById(id: string) {
		return this._productModel.findById(id)
	}

	async create(productDto: CreateProductDto) {
		const newProduct = new this._productModel(productDto);
		return newProduct.save()
	}

	async remove(id: string) {
		return this._productModel.findByIdAndRemove(id);
	}

	async update(id: string, productDto: CreateProductDto) {
		return this._productModel.findByIdAndUpdate(id, productDto, {new: true})
	}
}