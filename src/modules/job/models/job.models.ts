import * as Yup from 'yup';

export const jobDTO = Yup.object({
	title: Yup.string().required(),
	description: Yup.string().required(),
	employeeType: Yup.string().required(),
	isActive: Yup.boolean().required(),
	deadline: Yup.string().required(),
	categoryId: Yup.string().required(),
});

export type Job = Yup.InferType<typeof jobDTO>;
