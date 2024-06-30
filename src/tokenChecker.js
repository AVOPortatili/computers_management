async function isTokenValid(token) {
    fetch("http://localhost:8080/api/token/verify", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,
        })
    });

    if (!response.ok) {
        throw new Error("Errore nella richiesta HTTP: " + response.status);
    }

    const result = await response.json();
    if (result.message === 'valid') return true
    return false
}