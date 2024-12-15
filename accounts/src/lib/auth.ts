import { supabase } from './supabase';

export async function checkSession() {
	const token = localStorage.getItem('auth-token');
	if (!token) return false;

	// Opcional: lógica para verificar el token en Supabase.
	return true;
}
