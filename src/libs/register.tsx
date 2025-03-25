export default async function RegisterForm(
    userName: string,
    userTel: string,
    userEmail: string,
    userPassword: string
) {
    try {
        const response = await fetch("http://localhost:5050/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                password: userPassword,
                role: "user",
                tel: userTel,
            }),
        });

        if (!response.ok) {
            console.error("Registration failed:", response.status, response.statusText);
            const errorData = await response.json();
            console.error("Error details:", errorData);
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error in RegisterForm:", error);
        throw error;
    }
}