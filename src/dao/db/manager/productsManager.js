import {
    productsModel
} from "../models/products.model.js";

class ProductsManager {


    async findAll(obj) {
        const { limit = "10", page = "1", sort = null, ...filter } = obj;

        const options = {
            limit,
            page,
        };
    
        if (sort) {
            options.sort = {
                price: sort === 'asc' ? 1 : -1
            };
        }
    
        const response = await productsModel.paginate(filter, options);
    
        const info = {
            count: response.totalDocs,
            totalPages: response.totalPages,
            nextPage: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,
            prevPage: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null
        };
    
        if (sort) {
            return {
                info,
                sorted: response.docs
            };
        }
    
        return {
            info,
            results: response.docs
        };
    }

    async findById(id) {
        const result = await productsModel.findById(id);
        return result;
    }

    async createOne(obj) {
        const result = await productsModel.create(obj)
        return result;

    }

    async updateOne(id, obj) {
        const result = productsModel.updateOne({
            _id: id
        }, obj);
        return result;
    }

    async deleteOne(id) {
        const result = await productsModel.deleteOne({
            _id: id
        });
        return result
    }
}

export const productsManager = new ProductsManager();