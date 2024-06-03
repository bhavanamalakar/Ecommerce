// Inside your template or a separate JS file
const toggleButton = document.getElementById('mode-toggle');

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        const currentMode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newMode = currentMode === 'light' ? 'dark' : 'light';

        fetch('/toggle-mode/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '{{ csrf_token }}',  // Include CSRF token if CSRF protection is enabled
            },
            body: JSON.stringify({ mode: newMode }),
        })
        .then(response => {
            if (response.ok) {
                document.body.classList.toggle('dark-mode');
            }
        })
        .catch(error => console.error('Error toggling mode:', error));
    });
}
