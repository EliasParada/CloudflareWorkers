export const html = {
    login: () => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Login</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen">
          <div class="bg-white p-6 rounded shadow-md w-96">
            <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
            <form action="/api/login" method="POST">
              <input
                type="text"
                name="username"
                placeholder="Username"
                class="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                class="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                class="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <p class="text-center mt-4">
              Don't have an account?
              <a href="/register" class="text-blue-500">Register</a>
            </p>
          </div>
        </body>
      </html>
    `,
    register: () => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Register</title>
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen">
          <div class="bg-white p-6 rounded shadow-md w-96">
            <h1 class="text-2xl font-bold mb-4 text-center">Register</h1>
            <form action="/api/register" method="POST">
              <input
                type="text"
                name="username"
                placeholder="Username"
                class="w-full p-2 border rounded mb-4"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                class="w-full p-2 border rounded mb-4"
                required
              />
              <button
                type="submit"
                class="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
              >
                Register
              </button>
            </form>
            <p class="text-center mt-4">
              Already have an account?
              <a href="/login" class="text-green-500">Login</a>
            </p>
          </div>
        </body>
      </html>
    `,
  };
  