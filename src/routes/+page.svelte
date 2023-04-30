<script>
	import { PrismaClient } from '@prisma/client';
    import Post from "$lib/components/Post.svelte";
    //TODO: Get post list dynamically
    const prisma = new PrismaClient();
    /**
	 * @type {import('./PostData').PostData[]}
	 */
    const posts = [];

    prisma.posts.findMany().then(postList => {
        postList.forEach(post => {
            posts.push(post);
        })
    });

</script>

<div class="grid grid-flow-col-dense">
    {#each posts as { name, id, image_src }}
        <Post {name} {id} {image_src} />
    {/each}
</div>