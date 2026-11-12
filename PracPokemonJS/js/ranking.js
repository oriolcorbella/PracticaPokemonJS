import { getRankingEntries, getUsers } from './api/firebase.js';
import { formatTime } from './timer.js';

const MAX_ROWS = 5;
const TOP_ROWS = 4;
const DOTS = 'dots';

// Primero más cartas, y con las mismas cartas, menos tiempo
export function sortRanking(entries) {
    return [...entries].sort((a, b) => b.numCards - a.numCards || a.time - b.time);
}

// Decide qué filas se ven. Los puntos suspensivos se representan con DOTS
export function getVisibleRows(entries, newEntryId) {
    if (entries.length <= MAX_ROWS) {
        return entries;
    }

    const newIndex = entries.findIndex((entry) => entry.id === newEntryId);

    // El nuevo está entre los 4 primeros o no hay registro nuevo
    if (newIndex < TOP_ROWS) {
        return [...entries.slice(0, TOP_ROWS), DOTS];
    }

    // El nuevo es el quinto: se enseñan los 5 primeros
    if (newIndex === TOP_ROWS) {
        return [...entries.slice(0, MAX_ROWS), DOTS];
    }

    const rows = [...entries.slice(0, TOP_ROWS), DOTS, entries[newIndex]];

    if (newIndex < entries.length - 1) {
        rows.push(DOTS);
    }

    return rows;
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

        const rows = getVisibleRows(sortedEntries, newEntryId).map((row) => {
            if (row === DOTS) {
                return createMessageRow('...', 'dots');
            }
            return createEntryRow(row, newEntryId);
        });

        rankingBody.replaceChildren(...rows);
    } catch {
        rankingBody.replaceChildren(createMessageRow('No se ha podido cargar el ranking', 'empty'));
    }
}
