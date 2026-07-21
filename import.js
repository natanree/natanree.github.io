const input = document.getElementById('fileInput');

input.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const text =  await file.text();
    const data = JSON.parse(text);

    console.log(data);
})