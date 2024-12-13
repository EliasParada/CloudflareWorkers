import { Ai } from '@cloudflare/ai'
import { Hono } from 'hono'
import { requestId } from 'hono/request-id'

export interface Env {
	AI: any
}

const app = new Hono<{ Bindings: Env }>()

// GET /?prompt="Some question that I got"
app.get("/", async c => {
	// const url = new URL(request.url)
	// const prompt = url.searchParams.get("prompt")

	const ai = new Ai(c.env.AI)

	const content = c.req.query("prompt") || "What is the origin of the phrase Hello, World"

	const messages = [
		{ role: "system", content: "You are a rude assistant" },
		{ role: "user", content }
	];

	const inputs = { messages }

	const res = await ai.run("@cf/mistral/mistral-7b-instruct-v0.1", inputs)

	return c.json(res)
})

export default app