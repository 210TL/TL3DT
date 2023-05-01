import prisma from '$lib/prisma';
import type { Actions } from './$types';
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

type reqData = {
	userID: number;
	id: number;
};

const session: any = {sessionObj:{}};

export const load: PageServerLoad = async (event) => {
	session.sessionObj = {};
	const rsession = await event.locals.getSession();
	if (!rsession?.user) throw redirect(303, "/");
	session.sessionObj = rsession;
};

export const actions = {
	default: async ({ request }) => {
		if(!session.sessionObj.user) return;
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
			console.log(`User (id ${JSON.stringify(session.sessionObj.user)}) has requested print ${item.name} (id ${item.id})`);
		});

		return { success: true };
	}
} satisfies Actions;
