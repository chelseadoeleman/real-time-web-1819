class State {

    set(key, value) {
        this[key] = value
    }

    get(key) {
        return this[key]
    }
}

module.exports = {
    State
}