import prisma from '$lib/prisma';

import type { PageServerLoad } from './$types';

import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    const response = await prisma.posts.findMany();

	prisma.$disconnect();

	return {
        feed: response
	};
};