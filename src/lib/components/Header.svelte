<script lang="ts">
	import { page } from '$app/stores';
	let pages = [
		{
			name: 'Home',
			route: '/'
		},
		{
			name: 'Profile',
			route: '/me'
		}
	];
</script>

<nav class="nav bg-slate-500 p-5 grid grid-flow-col">
	{#each pages as { name, route }}
		<a class="bg-slate-300 w-min p-2 rounded-md" href={route}>{name}</a>
	{/each}
	<div class="signedInStatus">
		<p class="nojs-show loaded">
			{#if $page.data.session}
				{#if $page.data.session.user?.image}
					<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
				{/if}
				<span class="signedInText">
					<small>Signed in as</small><br />
					<strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
				</span>
				<a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a>
			{:else}
				<span class="notSignedInText">You are not signed in</span>
				<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
			{/if}
		</p>
	</div>
</nav>
