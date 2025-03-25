export interface IJobCreate {
	jobId: string;
	title: string;
	description: string;
	employeeType: string;
	categoryId: string;
	isActive: boolean;
	deadline: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IJobUpdate {
	title?: string;
	description?: string;
	employeeType?: string;
	categoryId?: string;
	isActive?: boolean;
	deadline?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IJobEntity {
	job_id: string;
	title: string;
	description: string;
	employee_type: string;
	category_id?: string;
	job_category?: {
		name: string;
	};
	is_active: boolean;
	deadline: Date;
	created_at?: Date;
	updated_at?: Date;
}

export interface IJobResponse {
	id: string;
	title: string;
	description: string;
	employeeType: string;
	category: string;
	isActive: boolean;
	deadline: Date;
	createdAt: Date;
	updatedAt: Date;
}
