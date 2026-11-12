const CARD_RATIO = 4 / 3; // alto / ancho de una carta
const GAP = 12; // separación entre cartas en px (igual que en el CSS)
const MAX_CARD_WIDTH = 200;

// Prueba todas las columnas posibles y se queda con la que da cartas más grandes
export function getBestLayout(cardsCount, boardWidth, boardHeight) {
    let bestLayout = { columns: 1, cardWidth: 0 };

    for (let columns = 1; columns <= cardsCount; columns++) {
        const rows = Math.ceil(cardsCount / columns);
        const widthByColumns = (boardWidth - GAP * (columns - 1)) / columns;
        const widthByRows = (boardHeight - GAP * (rows - 1)) / rows / CARD_RATIO;
        const cardWidth = Math.min(widthByColumns, widthByRows);

        if (cardWidth > bestLayout.cardWidth) {
            bestLayout = { columns, cardWidth };
        }
    }

    return bestLayout;
}

export function fitCardsToBoard(board) {
    const cardsCount = board.children.length;

    if (cardsCount === 0) {
        return;
    }

    const { columns, cardWidth } = getBestLayout(cardsCount, board.clientWidth, board.clientHeight);
    const finalWidth = Math.floor(Math.min(cardWidth, MAX_CARD_WIDTH));

    board.style.setProperty('--columns', columns);
    board.style.setProperty('--card-width', `${finalWidth}px`);
}
