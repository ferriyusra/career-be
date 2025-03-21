import { IReqUser } from '../../utils/interfaces';
import CategoryRepository from './repository';

class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async create(data: any) {
		return this.categoryRepository.create(data);
	}

	async update(categoryId: string, data: any) {
		return this.categoryRepository.update(categoryId, data);
	}

	async remove(categoryId: string) {
		return this.categoryRepository.remove(categoryId);
	}

	async findById(categoryId: string) {
		return this.categoryRepository.findById(categoryId);
	}

	async findAll(paging: any) {
		const data = await this.categoryRepository.findAll(paging);
		return data;
	}
}

export default CategoryService;
