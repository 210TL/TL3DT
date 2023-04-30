<script>
    export let name = '';
    export let src = '';
</script>

<div class="bg-slate-200 p-5 w-min">
    <img {src} alt="Photo of {name}">
    <h1>{name}</h1>
    <button>Request</button>
</div>