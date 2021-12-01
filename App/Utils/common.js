export function CreateArrayOfSize(N) {
    return Array.apply(null, { length: N }).map(Number.call, Number);
}

export function ShuffleArray(A) {
    let currentIndex = A.length, temporaryValue, randomIndex;
    let newArray = [...A];

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
}

export function MinutesToMinutesAndSeconds(millis) {
    if (millis < 0) {
        return;
    }

    const minutes = Math.floor(millis / 60);
    const seconds = (millis % 60).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export function CalculateRowAndColumn(size) {
    let first = Math.floor(Math.sqrt(size));
    if (size % first !== 0) {
        first = first - 1;
    }

    let second = size / first;

    return {
        rows: first > second ? first : second,
        columns: first > second ? second : first
    }
}