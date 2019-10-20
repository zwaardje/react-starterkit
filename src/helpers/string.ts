export const isBlank = value => (
    value === null
        || value === undefined
        || value.length === 0
        || (typeof(value) === 'string' && !!value.match(/^\s*$/))
        || (typeof(value) === 'object' && Object.keys(value).length === 0)
);
