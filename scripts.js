let mangaList = [];

const input = document.getElementById('fileInput');

input.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const text =  await file.text();
    mangaList = JSON.parse(text).series;

    renderTable(mangaList);
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

const addSeriesButton = document.getElementById('addSeriesSubmitButton');

addSeriesButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const alertPlaceholder = document.getElementById('addSeriesAlertPlaceholder');
    alertPlaceholder.innerHTML = '';

    const name = document.getElementById('seriesTitle').value;
    const currentChapter = document.getElementById('seriesChapter').value;
    const status = document.getElementById('seriesStatus').value;
    const type = document.getElementById('seriesType').value;

    if (name === '') {
        appendAlert('Please enter a series name.', 'danger', 'addSeriesAlertPlaceholder');
        return;
    }
    if (currentChapter === '') {
        appendAlert('Please enter the current chapter.', 'danger', 'addSeriesAlertPlaceholder');
        return;
    }
    if (status === '') {
        appendAlert('Please select a status.', 'danger', 'addSeriesAlertPlaceholder');
        return;
    }
    if (type === '') {
        appendAlert('Please select a type.', 'danger', 'addSeriesAlertPlaceholder');
        return;
    }

    mangaList.push({
        name: name,
        current_chapter: currentChapter,
        status: status,
        type: type
    });

    renderTable(mangaList);
    clearAddSeriesForm();

    const addSeriesModal = bootstrap.Modal.getInstance(document.getElementById('addSeriesModal'));
    addSeriesModal.hide();
});

const appendAlert = (message, type, placeholder) => {
    const wrapper = document.createElement('div')
    const alertPlaceholder = document.getElementById(placeholder);
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

  alertPlaceholder.append(wrapper)
}

const addSeriesCancelButton = document.getElementById('addSeriesCancelButton');

const addSeriesCloseButton = document.getElementById('addSeriesCloseButton');

addSeriesCancelButton.addEventListener('click', () => {
    clearAddSeriesForm();
});

addSeriesCloseButton.addEventListener('click', () => {
    clearAddSeriesForm();
});

function clearAddSeriesForm() {
    document.getElementById('seriesTitle').value = '';
    document.getElementById('seriesChapter').value = '';
    document.getElementById('seriesStatus').value = '';
    document.getElementById('seriesType').value = '';
}