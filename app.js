const express = require('express');
const path = require('path');
const gamesRoutes = require('./routes/game');
const app = express();

app.listen(3000, () => {
    console.log('server is listening at http://localhost:3000/  Let\'s play a game! ');
});

//Dwie linie kodu niżej łączą nam express z kodem a kod przechowuje w folderze public
app.use(express.static(
    path.join(__dirname, 'public'),

));

gamesRoutes(app);

