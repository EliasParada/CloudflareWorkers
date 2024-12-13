# Tutorial how to use Cloudflare Workers and Pages

# To start a Worker can go to the Workers & Pages section on Cloudflare Dashboard, or following the next instructions on a personal computer as a local projects

## Requirements:
- Node.js

## Initialize a worker:

To initialize a project just run the next command inside a directory on a command console.

```
npm create cloudflare
```

Then, to login in a Cloudflare just run the next command

```
npx wrangler logins
```

To run the project in a local serves exist the next commands, both are the same:
- `npm start`
- `npm run dev`

And, to deploy the Worker on the current Cloudflare account used the next command:
- `npm run deploy`

# Without Hono at `src/index.ts`
```ts
export interface Env {}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response(JSON.stringify({ hello: "World" }), {
			headers: {
				'Content-Type': 'application/json'
			}
		});
	},
} satisfies ExportedHandler<Env>;
```

# With Hono

```ts
import { Hono } from 'hono'

export interface Env {}

const app = new Hono<{ Bindings: Env }>()

app.get("/", c => {
	// c.text
	// c.html
	return c.json({ hello: "World" })
})

export default app
```

# Adding Cloudflare AI at `wrangler.toml`

First install the `cloudflare/ai` and `base64-js` packages with npm.

```
npm i @cloudflare/ai
npm i base64-js
```

Then go to the `wrangler.toml` file in the root folder, and add the next code lines.

```
[ai]
binding = "AI"
```

After of this, in the `src/index.ts` add the next code to integrate AI in the Hono app in order to the [Cloudlfare workers ai documentation](https://developers.cloudflare.com/workers-ai/models/mistral-7b-instruct-v0.1/).

```ts
import { Ai } from '@cloudflare/ai'
// ...
export interface Env {
	AI: any
}
// ...
app.get("/", async c => {
	const ai = new Ai(c.env.AI)

	const messages = [
		{ role: "system", content: "You are a friendly assistant" },
		{ role: "user", content: "What is the origin of the phrase Hello, World" },
	];

	const inputs = { messages }

	const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", inputs)

	return c.json(res)
})
```

Then we can adjust the code to get a param in the URL as a query, like this below:
```ts
// ...
app.get("/", async c => {
	// ..
    const content = c.req.query("prompt") || "What is the origin of the phrase Hello, World"

	const messages = [
		{ role: "system", content: "You are a friendly assistant" },
		{ role: "user", content },
	];

	// ..

	return c.json(res)
})
```
