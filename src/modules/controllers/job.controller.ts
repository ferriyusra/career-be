import response from '../../utils/response';
import { Response } from 'express';
import { IReqUser } from '../../utils/interfaces';
import { getPaging } from '../../utils/paging';
import { getCategorySearchable } from '../category/searchable';
import { jobDTO } from '../job/models/job.models';
import JobService from '../job/service';

class JobController {
	constructor(private readonly jobService: JobService) {}

	async create(req: IReqUser, res: Response) {
		try {
			await jobDTO.validate(req.body);
			const result = await this.jobService.create(req.body);
			return response.success(res, result, 'Success create job');
		} catch (error) {
			console.log(error);
			return response.error(res, error, 'Failed create job');
		}
	}

	// async findAll(req: IReqUser, res: Response) {
	// 	try {
	// 		const { query } = req;
	// 		const paging = getPaging(query, getCategorySearchable());

	// 		const categories = await this.categoryService.findAll(paging);

	// 		return response.pagination(
	// 			res,
	// 			categories.rows,
	// 			Number(categories.count),
	// 			paging,
	// 			'Success find all category'
	// 		);
	// 	} catch (error) {
	// 		return response.error(res, error, 'Failed find all category');
	// 	}
	// }

	// async findOne(req: IReqUser, res: Response) {
	// 	try {
	// 		const { id } = req.params;

	// 		const result = await this.categoryService.findById(id);

	// 		if (!result) {
	// 			return response.notfound(res, 'Category not found');
	// 		}

	// 		return response.success(res, result, 'Success find one category');
	// 	} catch (error) {
	// 		return response.error(res, error, 'Failed find one category');
	// 	}
	// }

	// async update(req: IReqUser, res: Response) {
	// 	try {
	// 		const { id } = req.params;

	// 		const result = await this.categoryService.update(id, req.body);
	// 		if (!result) {
	// 			return response.notfound(res, 'Category not found');
	// 		}

	// 		return response.success(res, result, 'Success update category');
	// 	} catch (error) {
	// 		return response.error(res, error, 'Failed update category');
	// 	}
	// }

	// async remove(req: IReqUser, res: Response) {
	// 	try {
	// 		const { id } = req.params;

	// 		const result = await this.categoryService.remove(id);
	// 		if (!result) {
	// 			return response.notfound(res, 'Category not found');
	// 		}

	// 		return response.success(res, result, 'Success remove category');
	// 	} catch (error) {
	// 		return response.error(res, error, 'Failed remove category');
	// 	}
	// }
}

function toCategoryContract(data: any) {
	return {
		categoryId: data.categoryId,
		name: data.name,
		isActive: data.isActive,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}

export default JobController;
