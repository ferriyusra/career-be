import { Prisma, PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { IJobCreate, IJobUpdate, IJobEntity } from './interface';

class JobRepository {
	private db: PrismaClient;

	constructor(dbClient: PrismaClient) {
		this.db = dbClient;
	}

	async create(data: IJobCreate) {
		const create = await this.db.jobs.create({
			data: {
				job_id: uuidv4(),
				title: data.title,
				description: data.description,
				employee_type: data.employeeType,
				category_id: data.categoryId,
				is_active: data.isActive,
				deadline: data.deadline,
				updated_at: new Date(),
			},
		});
		return toDto(create);
	}

	async update(jobId: string, data: IJobUpdate) {
		const updated = await this.db.jobs.update({
			where: { job_id: jobId },
			data: {
				title: data.title,
				description: data.description,
				employee_type: data.employeeType,
				category_id: data.categoryId,
				is_active: data.isActive,
				deadline: data.deadline,
				updated_at: new Date(),
			},
		});
		return toDto(updated);
	}

	async remove(jobId: string) {
		return await this.db.jobs.delete({
			where: { job_id: jobId },
		});
	}

	async findById(jobId: string) {
		const data = await this.db.$queryRaw<IJobEntity>(Prisma.sql`
			SELECT 
				jobs.job_id, 
				jobs.title, 
				jobs.description, 
				jobs.deadline, 
				jobs.employee_type, 
				job_categories.name AS category_name, 
				jobs.is_active, 
				jobs.created_at, 
				jobs.updated_at
			FROM jobs
			LEFT JOIN job_categories ON jobs.category_id = job_categories.category_id
			WHERE jobs.job_id = ${jobId}
			;
		`);
		return data ? toDto(data) : null;
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

		const jobs = await this.db.jobs.findMany({
			take: paging.limit,
			skip: skip,
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
			orderBy,
			include: {
				job_category: {
					select: {
						name: true,
					},
				},
			},
		});

		const totalItems = await this.db.jobs.count({
			where: {
				AND: filters.length > 0 ? filters : undefined,
			},
		});

		return {
			rows: jobs.map((job) => toDto(job)),
			count: totalItems,
		};
	}
}

function toDto(data: IJobEntity) {
	return {
		id: data.job_id,
		title: data.title,
		description: data.description,
		employeeType: data.employee_type,
		isActive: data.is_active,
		deadline: data.deadline,
		category: data.job_category,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};
}

export default JobRepository;
