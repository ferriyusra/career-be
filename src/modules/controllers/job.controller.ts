import response from '../../utils/response';
import { Response } from 'express';
import { IReqUser } from '../../utils/interfaces';
import { getPaging } from '../../utils/paging';
import JobService from '../job/service';
import { jobDTO } from '../job/validation';
import { getJobSearchable } from '../job/searchable';
import { IJobResponse } from '../job/interface';

class JobController {
	constructor(private readonly jobService: JobService) {}

	async create(req: IReqUser, res: Response) {
		try {
			await jobDTO.validate(req.body);
			const result = await this.jobService.create(req.body);
			return response.success(res, result, 'Success create job');
		} catch (error) {
			return response.error(res, error, 'Failed create job');
		}
	}

	async findAll(req: IReqUser, res: Response) {
		try {
			const { query } = req;
			const paging = getPaging(query, getJobSearchable());

			const data = await this.jobService.findAll(paging);

			const rows = data.rows.map((item) => toJobContract(item));

			return response.pagination(
				res,
				rows,
				Number(data.count),
				paging,
				'Success find all job'
			);
		} catch (error) {
			return response.error(res, error, 'Failed find all job');
		}
	}

	async findOne(req: IReqUser, res: Response) {
		try {
			const { id } = req.params;

			const result = await this.jobService.findById(id);

			if (!result) {
				return response.notfound(res, 'Job not found');
			}

			return response.success(res, result, 'Success find one job');
		} catch (error) {
			return response.error(res, error, 'Failed find one job');
		}
	}

	async update(req: IReqUser, res: Response) {
		try {
			const { id } = req.params;

			const result = await this.jobService.update(id, req.body);
			if (!result) {
				return response.notfound(res, 'Job not found');
			}

			return response.success(res, result, 'Success update job');
		} catch (error) {
			return response.error(res, error, 'Failed update job');
		}
	}

	async remove(req: IReqUser, res: Response) {
		try {
			const { id } = req.params;

			const result = await this.jobService.remove(id);
			if (!result) {
				return response.notfound(res, 'Job not found');
			}

			return response.success(res, result, 'Success remove job');
		} catch (error) {
			return response.error(res, error, 'Failed remove job');
		}
	}
}

function toJobContract(data: any): IJobResponse {
	return {
		id: data.id,
		title: data.title,
		description: data.description,
		employeeType: data.employeeType,
		category: data.category.name,
		isActive: data.isActive,
		deadline: data.deadline,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
	};
}

export default JobController;
