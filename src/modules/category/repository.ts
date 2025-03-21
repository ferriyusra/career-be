import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

class CategoryRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: any) {
		const create = await this.db.job_categories.create({
			data: {
				category_id: uuidv4(),
				name: data.name,
				is_active: data.isActive,
				updated_at: new Date(),
			},
		});
		return toDto(create);
	}

	async update(categoryId: string, data: any) {
		const updated = await this.db.job_categories.update({
			where: { category_id: categoryId },
			data: {
				name: data.name,
				is_active: data.isActive,
				updated_at: new Date(),
			},
		});
		return toDto(updated);
	}

	async remove(categoryId: string) {
		return await this.db.job_categories.delete({
			where: { category_id: categoryId },
		});
	}

	async findById(categoryId: string) {
		const data = await this.db.job_categories.findFirst({
			where: { category_id: categoryId },
		});
		return toDto(data);
	}

	async findAll(paging: any) {
		const skip = (paging.page - 1) * paging.limit;

		const filters: any = [];

		if (paging.search) {
			Object.keys(paging.search).forEach((key) => {
				if (typeof paging.search[key] !== 'object') {
					filters.push({
						[key]: {
							equals: paging.search[key],
						},
					});
				} else if (paging.search[key].like) {
					filters.push({
						[key]: {
							contains: paging.search[key].like,
						},
					});
				}
			});
		}

		let categories;
		if (paging.sort) {
			const sortField = paging.sort.split(' ')[0];
			const sortOrder = paging.sort.split(' ')[1];

			categories = await this.db.job_categories.findMany({
				take: paging.limit,
				skip: skip,
				orderBy: {
					[sortField]: sortOrder === 'desc' ? 'desc' : 'asc',
				},
			});
		}

		const totalItems = await this.db.job_categories.count({
			where: {
				AND: [...filters],
			},
		});

		return {
			rows: categories?.map((category) => toDto(category)),
			count: totalItems,
		};
	}
}

function toDto(data: any) {
	return {
		categoryId: data.category_id,
		name: data.name,
		isActive: data.is_active,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
}

export default CategoryRepository;
