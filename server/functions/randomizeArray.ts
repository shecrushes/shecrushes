// Categories
const comments = require('../scrapingData/comments');

const randomizeArray = (array: any) => {
    // Insert random commments
    let m = comments.length;
    let i: number;
    let t: number;

    // While there remain elements to shuffle
    while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = comments[m];
        comments[m] = comments[i];
        comments[i] = t;
    }

    return array;
};

module.exports = { randomizeArray };
