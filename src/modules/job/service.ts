import { IJobCreate, IJobUpdate } from './interface';
import JobRepository from './repository';

class JobService {
	constructor(private readonly jobRepository: JobRepository) {}

	async create(data: IJobCreate) {
		return this.jobRepository.create(data);
	}

	async update(jobId: string, data: IJobUpdate) {
		return this.jobRepository.update(jobId, data);
	}

	async remove(jobId: string) {
		return this.jobRepository.remove(jobId);
	}

	async findById(jobId: string) {
		return this.jobRepository.findById(jobId);
	}

	async findAll(paging: any) {
		const data = await this.jobRepository.findAll(paging);
		return data;
	}
}

export default JobService;
