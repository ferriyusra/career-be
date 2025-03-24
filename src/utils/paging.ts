import { camelToSnakeCase } from './string';
import { QUERY_LIMIT_DEFAULT, QUERY_SORT_DEFAULT } from './env';

export function getPaging(query: any, searchables?: any) {
	const { page: pageOri, perPage, sort: sortOri, ...q } = query;

	// set page
	const page = Number(pageOri) || 1;

	// set limit
	const limit = Number(perPage) || QUERY_LIMIT_DEFAULT;

	// set sort
	let sort;
	if (!sortOri) {
		sort = QUERY_SORT_DEFAULT;
	} else {
		const sorts = sortOri.split(' ');
		const sortField = sorts[0].trim();
		const sortValue = sorts[1].trim().toLowerCase();

		if (
			searchables.includes(sortField) &&
			(sortValue === 'asc' || sortValue === 'desc')
		) {
			const sortFieldSnakeCase = camelToSnakeCase(sortField);
			sort = `${sortFieldSnakeCase} ${sortValue}`;
		} else {
			sort = QUERY_SORT_DEFAULT;
		}
	}

	// set search
	let search: any;
	if (Object.keys(q).length > 0) {
		Object.entries(q).forEach((property) => {
			const [k, v] = property;

			if (searchables.includes(k)) {
				if (!search) {
					search = {};
				}
				const fieldName = camelToSnakeCase(k);

				// if it's primitive, v must have a value
				if (typeof v !== 'object' && v) {
					search[fieldName] = v;
				} else if (typeof v === 'object' && v !== null && 'like' in v) {
					search[fieldName] = v;
				}
			}
		});
	}

	const paging = {
		page,
		offset: (page - 1) * limit,
		limit,
		sort,
		search,
	};

	return paging;
}
