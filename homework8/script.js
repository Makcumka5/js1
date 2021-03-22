"use strict";

// В общем не совсем понял куда можно вставить, пару коротких замыканий нашел где воткнуть.
// Затем уперся в пример, который мой мозг отказался воспринимать.
// В чем суть, почему возвращается значение "0"
// Brain crushed))

function getCounter() {
    let counter = 0;
    return function() {
        return counter++;
    };
}

let count = getCounter();
console.log(count(), count(), count());