import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { Actions } from './$types';

const prisma = new PrismaClient();

type reqData = {
	userID: number;
	id: number;
};

export const actions = {
	default: async ({ cookies, request }) => {
		const res = await request.text();
		const data: reqData[] = [];
		res.split('&').forEach((elem) => {
			let bsplitter = elem.split('=')[0];
			let asplitter = elem.split('=')[1];
			let tempObject: any = {};
			tempObject[bsplitter] = Number(asplitter);
			data.push(tempObject);
		});

		const postList = prisma.posts.findMany();

		(await postList).forEach((item) => {
			if (item.id !== data[1].id) return; // We know the form will always submit data[1] as the ID object
			console.log('User has requested print "' + item.name + '" with ID ' + item.id);
		});

		prisma.$disconnect();
		return { success: true };
	}
} satisfies Actions;
