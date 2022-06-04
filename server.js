const express = require('express');

// creating an express server
const app = express();

// sets up the port to use
const PORT = process.env.PORT || 3001;

// parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// connecting routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

app.listen(PORT, function() {
    console.log(`${PORT} is being used.`);
});