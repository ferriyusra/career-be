import * as Yup from 'yup';

export const categoryDTO = Yup.object({
	name: Yup.string().required(),
	isActive: Yup.boolean().required(),
});

export type Category = Yup.InferType<typeof categoryDTO>;
