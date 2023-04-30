<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="grid grid-flow-col-dense">
	{#each data.feed as post (post.id)}}
		<Post {post} />
	{/each}
</div>