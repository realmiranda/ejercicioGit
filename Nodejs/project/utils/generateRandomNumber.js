const generateRandomNumber = (max = 15) => {
    let number = "";

    for (let i = 0; i < max; i++) {
        number += Math.floor(Math.random() * 10);
    }

    return Number(number);
}

module.exports = generateRandomNumber;
