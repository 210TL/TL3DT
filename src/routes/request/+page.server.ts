import prisma from '$lib/prisma';
import type { Actions } from './$types';

type reqData = {
	userID: number;
	id: number;
};

export const actions = {
	default: async ({ request }) => {
		const res = await request.text();
		const data: reqData[] = [];
		res.split('&').forEach((elem) => {
			const beforeSplitter = elem.split('=')[0];
			const afterSplitter = elem.split('=')[1];
			const tempObject: any = {};
			tempObject[beforeSplitter] = Number(afterSplitter); // We know there will always be a number here
			data.push(tempObject);
		});

		const postList = prisma.posts.findMany();

		(await postList).forEach((item) => {
			if (item.id !== data[1].id) return; // We know the form will always submit data[1] as the ID object
			console.log('User has requested print "' + item.name + '" with ID ' + item.id);
		});

		return { success: true };
	}
} satisfies Actions;
