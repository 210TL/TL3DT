<script>
    export let name = '';
    export let id = 0;
    export let image_src = '';
</script>

<form action="/request" method="POST">
    <div class="bg-slate-200 p-5 w-min">
        <img src={image_src} alt="Photo of {name}">
        <h1>{name}</h1>
        <input name="uid" value="UserID" hidden />
        <input name="id" value={id} hidden />
        <input type="submit" value="Request" />
        {id}
    </div>
</form>