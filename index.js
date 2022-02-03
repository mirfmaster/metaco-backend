const app = require("./src/core/boot");

app.get('/', (req, res) => {
    res.send('Hello World!')
})