<script lang="ts">
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let errorMessage = '';

	async function register() {
		const { error } = await supabase.from('users').insert([
			{
				username,
				password_hash: btoa(password) // Hash simple para ejemplo; usa bcrypt para producción.
			}
		]);

		if (error) {
			errorMessage = error.message;
		} else {
			alert('User registered successfully!');
			goto('/login');
		}
	}
</script>

<div class="max-w-md mx-auto mt-10">
	<h1 class="text-2xl font-bold mb-4">Register</h1>
	<form on:submit|preventDefault={register} class="space-y-4">
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
			Register
		</button>
	</form>
	{#if errorMessage}
		<p class="text-red-500 mt-2">{errorMessage}</p>
	{/if}
</div>
