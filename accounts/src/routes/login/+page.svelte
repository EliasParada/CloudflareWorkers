<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let errorMessage = '';

	async function login() {
		const { data, error } = await supabase
			.from('users')
			.select('password_hash')
			.eq('username', username)
			.single();

		if (error || !data || atob(data.password_hash) !== password) {
			errorMessage = 'Invalid username or password';
		} else {
			alert('Login successful!');
			goto('/');
		}
	}
</script>

<div class="max-w-md mx-auto mt-10">
	<h1 class="text-2xl font-bold mb-4">Login</h1>
	<form on:submit|preventDefault={login} class="space-y-4">
		<input
			type="text"
			bind:value={username}
			placeholder="Username"
			class="block w-full p-2 border border-gray-300 rounded"
		/>
		<input
			type="password"
			bind:value={password}
			placeholder="Password"
			class="block w-full p-2 border border-gray-300 rounded"
		/>
		<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
			Login
		</button>
	</form>
	{#if errorMessage}
		<p class="text-red-500 mt-2">{errorMessage}</p>
	{/if}
</div>
