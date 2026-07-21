const input = document.getElementById('fileInput');

input.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const text =  await file.text();
    const data = JSON.parse(text);

    renderTable(data.series);
})

function renderTable(data) {
    const tableBody = document.getElementById('seriesTableBody');
    tableBody.innerHTML = '';
    data.forEach((series) => {
        const row = document.createElement('tr');

        row.innerHTML = `<td>${series.name}</td>
                        <td>${series.current_chapter}</td>
                        <td>${series.status}</td>`;
        tableBody.appendChild(row);
    });
}