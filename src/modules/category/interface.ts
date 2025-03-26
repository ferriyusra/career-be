export interface ICategory {
	_id?: string;
	icon?: string;
	description?: string;
}

export interface ICategoryEntity {
	category_id: string;
	name: string;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
}
