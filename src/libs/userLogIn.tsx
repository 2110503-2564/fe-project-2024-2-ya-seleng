export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch(
    "http://localhost:5050/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return await response.json();
}
