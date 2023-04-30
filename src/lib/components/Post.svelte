<script lang="ts">
    import type { PageData } from "./$types";

    export let post: PageData;
</script>

<form action="/request" method="POST">
    <div class="bg-slate-200 p-5 w-min">
        <img src={post.image_src} alt="Photo of {post.name}">
        <h1>{post.name}</h1>
        <input name="uid" value="UserID" hidden />
        <input name="id" value={post.id} hidden />
        <input type="submit" value="Request" />
        {post.id}
    </div>
</form>