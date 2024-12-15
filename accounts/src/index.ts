import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static';
import { html } from './templates';

const app = new Hono<{ Bindings: { USERS: KVNamespace } }>();

// Función para generar un hash usando WebCrypto
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)));
}

// Función para verificar el hash
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

// Ruta para Login (Página Estilizada con TailwindCSS)
app.get('/login', (c) => c.html(html.login()));

// Ruta para Registro (Página Estilizada con TailwindCSS)
app.get('/register', (c) => c.html(html.register()));

// Ruta para manejar estilos estáticos
app.use('/styles.css', serveStatic({ path: './public/styles.css' }));

// API para registro
app.post('/api/register', async (c) => {
  const body = await c.req.parseBody();
  const username = body.username?.toString();
  const password = body.password?.toString();

  if (!username || !password) {
    return c.json({ success: false, error: 'Username and password are required' }, 400);
  }

  const userExists = await c.env.USERS.get(`user:${username}`);
  if (userExists) {
    return c.json({ success: false, error: 'User already exists' }, 409);
  }

  const hashedPassword = await hashPassword(password);
  await c.env.USERS.put(`user:${username}`, hashedPassword);

  return c.json({ success: true, message: 'User registered successfully' });
});

// API para login
app.post('/api/login', async (c) => {
  const body = await c.req.parseBody();
  const username = body.username?.toString();
  const password = body.password?.toString();

  if (!username || !password) {
    return c.json({ success: false, error: 'Username and password are required' }, 400);
  }

  const storedHash = await c.env.USERS.get(`user:${username}`);
  if (!storedHash) {
    return c.json({ success: false, error: 'Invalid username or password' }, 401);
  }

  const isValid = await verifyPassword(password, storedHash);
  if (!isValid) {
    return c.json({ success: false, error: 'Invalid username or password' }, 401);
  }

  // Generar un token simple
  const token = crypto.randomUUID();
  await c.env.USERS.put(`token:${token}`, username, { expirationTtl: 3600 }); // Expira en 1 hora

  return c.json({ success: true, token });
});

// API para verificar sesión activa
app.get('/api/session', async (c) => {
  const token = c.req.query('token');
  if (!token) {
    return c.json({ authenticated: false });
  }

  const username = await c.env.USERS.get(`token:${token}`);
  if (!username) {
    return c.json({ authenticated: false });
  }

  return c.json({ authenticated: true, username });
});

export default app;
