// lord have mercy do not code like this

goodJob = () =>
    [
        '️️😀',
        '😁',
        '😃',
        '😄',
        '😊',
        '😋',
        '😎',
        '🙂',
        '🤗',
        '🤩',
        '🤑',
        '🤪',
        '😇',
        '🤠',
        '🤓',
        '😺',
        '😸'
    ].find((_, index, array) => Math.random() < 1 / (array.length - index))

module.exports = { goodJob }
