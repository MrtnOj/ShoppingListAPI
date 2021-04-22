"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const suggestionsCalculator = (filteredBuyHistory) => {
    const date = new Date();
    let suggestions = [];
    filteredBuyHistory.forEach(item => {
        let itemTimeDifferences = [];
        for (let i = 0; i < item.boughtDates.length - 1; i++) {
            const timeDifference = item.boughtDates[i].getTime() - item.boughtDates[i + 1].getTime();
            itemTimeDifferences.push(Math.floor(timeDifference / 1000));
            // console.log(`timediff ${i} for item ${item.item.name} === ${Math.floor(timeDifference / 1000)}`)
        }
        // console.log(`timediffs for ${item.item.name} --- ${itemTimeDifferences}`)
        const averageTimeBetweenBuys = itemTimeDifferences.reduce((accumulator, time) => {
            return (accumulator + time);
        }) / itemTimeDifferences.length;
        const cleanedUpItem = item.item;
        if (averageTimeBetweenBuys < Math.floor((date.getTime() - item.boughtDates[0].getTime()) / 1000)) {
            suggestions.push(cleanedUpItem);
        }
    });
    return suggestions;
};
exports.default = suggestionsCalculator;
