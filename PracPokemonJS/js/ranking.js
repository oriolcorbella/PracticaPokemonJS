import { getRankingEntries, getUsers } from './api/firebase.js';
import { formatTime } from './timer.js';

// Primero más cartas, y con las mismas cartas, menos tiempo
export function sortRanking(entries) {
    return [...entries].sort((a, b) => b.numCards - a.numCards || a.time - b.time);
}

function createCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function createEntryRow(entry, newEntryId) {
    const row = document.createElement('tr');

    if (entry.id === newEntryId) {
        row.classList.add('highlight');
    }

    row.append(
        createCell(entry.position),
        createCell(entry.user ? entry.user.username : '-'),
        createCell(entry.user ? entry.user.email : '-'),
        createCell(formatTime(entry.time)),
        createCell(entry.numCards),
    );

    return row;
}

function createMessageRow(text, className) {
    const row = document.createElement('tr');
    const cell = createCell(text);
    cell.colSpan = 5;
    row.classList.add(className);
    row.append(cell);
    return row;
}

export async function showRanking(newEntryId = null) {
    const rankingBody = document.getElementById('ranking-body');

    try {
        const [entries, users] = await Promise.all([getRankingEntries(), getUsers()]);

        const sortedEntries = sortRanking(entries).map((entry, index) => ({
            ...entry,
            position: index + 1,
            user: users.find((user) => user.id === entry.userId),
        }));

        if (sortedEntries.length === 0) {
            rankingBody.replaceChildren(createMessageRow('Todavía no hay partidas', 'empty'));
            return;
        }

        const rows = sortedEntries.map((entry) => createEntryRow(entry, newEntryId));

        rankingBody.replaceChildren(...rows);
    } catch {
        rankingBody.replaceChildren(createMessageRow('No se ha podido cargar el ranking', 'empty'));
    }
}
