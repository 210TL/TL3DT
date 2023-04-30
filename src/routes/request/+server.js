import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST({ request, cookies }) {
	const { id } = await request.json();

    const postList = prisma.posts.findMany();

    (await postList).forEach(item => {
        if(item.id !== id) return;
    })

	return json({ }, { status: 201 });
}