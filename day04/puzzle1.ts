(() => {
    type RepeatTuple<T, L extends number, Acc extends [...any] = []> = Acc["length"] extends L
        ? Acc
        : RepeatTuple<T, L, [...Acc, T]>;
    type NumberBoard = RepeatTuple<RepeatTuple<number, 5>, 5>;
    type BooleanBoard = RepeatTuple<RepeatTuple<boolean, 5>, 5>;
    interface BoardObject {
        board: NumberBoard;
        marked: BooleanBoard;
    }
    function equals<T>(val: T) {
        return (x) => x === val;
    }
    function isWinningBoard(board: BoardObject) {
        return (
            board.marked.some((row) => row.every(equals(true))) ||
            board.marked.some((_, i) => board.marked.map((row) => row[i]).every(equals(true)))
        );
    }
    const data = document.querySelector("pre").textContent.split("\n");
    const [numbersString, ...rest] = data;
    const [rawBoards] = rest
        .slice(1)
        .reduce(
            ([boards, current], val) =>
                val === "" ? [[...boards, current], []] : [boards, [...current, val]],
            [[], []] as [string[][], string[]],
        );
    const boards: BoardObject[] = rawBoards
        .map(
            (
                board, // convert string arrays to 2d arrays of numbers
            ) =>
                board.map((s) =>
                    s
                        .replace(/ +/g, " ")
                        .trim()
                        .split(" ")
                        .map((x) => parseInt(x)),
                ) as NumberBoard,
        )
        .map((board) => ({
            board,
            marked: Array(5)
                .fill(0)
                .map(() => Array(5).fill(false)) as BooleanBoard,
        }));
    const numbers = numbersString.split(",").map((x) => parseInt(x));
    console.log({ numbers, rest, boards });
    gameLoop: for (const num of numbers) {
        for (const board of boards) {
            boardMarkingLoop: for (const i in board.board) {
                const row = board.board[i];
                for (const j in row) {
                    const val = row[j];
                    if (val === num) {
                        board.marked[i][j] = true;
                        break boardMarkingLoop;
                    }
                }
            }
            if (isWinningBoard(board)) {
                const unmarked = board.board.flatMap((r, i) =>
                    r.reduce(
                        (acc, v, j) => (board.marked[i][j] ? acc : [...acc, v]),
                        [] as number[],
                    ),
                );
                console.log(unmarked);
                const score = unmarked.reduce((l, r) => l + r) * num;
                console.log(score);
                break gameLoop;
            }
        }
    }
})();
