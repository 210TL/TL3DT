<script>
	import { PrismaClient } from '@prisma/client';
    import Post from "./Post.svelte";
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

    console.log(posts)

</script>

<div class="grid grid-flow-col-dense">
    {#each posts as { name, src }}
        <Post {name} {src} />
    {/each}
</div>