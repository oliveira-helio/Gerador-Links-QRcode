

document.getElementById('qrForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const url = document.getElementById('url').value;
    const response = await fetch('/qr/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });
    
    const result = await response.json();
    if (result.code) {
        document.getElementById('qrCodeOutput').innerHTML = `<img src="${result.code}" alt="QR Code">`;
    }
});

document.getElementById('logout').addEventListener('click', async () => {
    await fetch('/logout', { method: 'POST' });
    window.location.href = '/login';
});