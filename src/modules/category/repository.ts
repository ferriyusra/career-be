import { Prisma, PrismaClient } from '@prisma/client';
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
				const value = paging.search[key];
				if (typeof value !== 'object') {
					filters.push({ [key]: { equals: value } });
				} else if (value.like) {
					filters.push({ [key]: { contains: value.like } });
				}
			});
		}

		let orderBy = {};
		if (paging.sort) {
			const [sortField, sortOrder] = paging.sort.split(' ');
			orderBy = { [sortField]: sortOrder === 'desc' ? 'desc' : 'asc' };
		}

		const categories = await this.db.job_categories.findMany({
			// select: {
			// 	category_id: true,
			// 	name: true,
			// 	is_active: true,
			// 	created_at: true,
			// 	updated_at: true,
			// },
			take: paging.limit,
			skip: skip,
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
			orderBy,
		});

		const totalItems = await this.db.job_categories.count({
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
		});

		return {
			rows: categories.map((category) => toDto(category)),
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
