export const authorize = async (username, password) => {
    try {
        const response = await fetch('/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })

        if (!response.ok) {
            throw new Error('Invalid credentials')
        }
        return true
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}

const login = async () => {
    const loginForm = document.querySelector('.login-form')

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = document.getElementById('username').value
        const password = document.getElementById('password').value

        try {
            await authorize(username, password)
            window.location.href = '/admin'
        } catch (error) {
            const errorMessageElement = document.getElementById('error-message')
            errorMessageElement.innerText = `*${error.message}`
        }
    })
}

export default login
