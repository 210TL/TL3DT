<script>
    let pages = [
        {
            'name': 'Home',
            'route': '/'
        },
        {
            'name': 'Profile',
            'route': '/me'
        },
        {
            'name': 'Login',
            'route': '/login'
        }
    ]

</script>

<div class="nav bg-slate-500 p-5 grid grid-flow-col">
    {#each pages as { name, route }}
    <a class="bg-slate-300 w-min p-2 rounded-md" href={route}>{name}</a>
    {/each}
</div>