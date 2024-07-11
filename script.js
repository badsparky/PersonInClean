document.addEventListener('DOMContentLoaded', function() {
    const defaultCsvPath = 'roster.csv';  // デフォルトで読み込むCSVファイルのパス
    fetch(defaultCsvPath)
        .then(response => response.text())
        .then(text => {
            const names = parseCsv(text);
            const currentWeekRoster = generateRoster(names);
            displayRoster(currentWeekRoster);
        })
        .catch(error => console.error('Error loading CSV:', error));
});

function parseCsv(text) {
    const rows = text.trim().split('\n');
    const names = rows.map(row => row.split(',')[0]);
    return names;
}

function generateRoster(names) {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1); // 1月1日
    const weekNumber = Math.ceil((((today - startDate) / 86400000) + startDate.getDay() + 1) / 7);
    const roster = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        const member = names[(weekNumber + i - 1) % names.length];
        roster.push({ date: formatDate(date), member: member });
    }
    return roster;
}

function formatDate(date) {
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    return `${month}-${day}(${dayOfWeek})`;
}

function displayRoster(roster) {
    const tbody = document.querySelector('#rosterTable tbody');
    tbody.innerHTML = '';

    roster.forEach(entry => {
        const row = document.createElement('tr');
        const dateCell = document.createElement('td');
        const memberCell = document.createElement('td');
        dateCell.textContent = entry.date;
        memberCell.textContent = entry.member;
        row.appendChild(dateCell);
        row.appendChild(memberCell);
        tbody.appendChild(row);
    });
}
