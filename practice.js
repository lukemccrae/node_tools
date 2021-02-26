const makeSmoothie = async() => {
    const a = getFruit('pineapple');
    const b = getFruit('apple');

    const smoothie = await Promise.all([a, b]);

    return smoothie;
}

function getFruit(fruit) {
    return fruit;
}

makeSmoothie(console.log)