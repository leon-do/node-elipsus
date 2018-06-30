// Don't try this at home

badJob = () =>
    [
        '😡',
        '🤬',
        '🤢',
        '🤮',
        '💀',
        '🤱',
        '🤷‍',
        '🤦',
        '👻',
        '💩',
        '💔',
        '🥈',
        '!🥇',
        '⛈',
        '🕷',
        '📉',
        '🆘'
    ].find((_, index, array) => Math.random() < 1 / (array.length - index))

module.exports = { badJob }
