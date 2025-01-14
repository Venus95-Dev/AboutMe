

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                contactForm.reset();
            } else {
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            }
        } catch (error) {
            console.error("Error:", error);
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
    });
});










