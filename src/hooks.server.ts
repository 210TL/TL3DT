import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import Discord from "@auth/core/providers/discord"
import { DISCORD_ID, DISCORD_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth({
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
	Discord({ clientId: DISCORD_ID, clientSecret: DISCORD_SECRET })
],
})