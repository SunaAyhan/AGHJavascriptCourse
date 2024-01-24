import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = app.get('env') === 'development';

app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

let students = [
    {
        fname: 'John',
        lname: 'Kowalski'
    },
    {
        fname: 'Anna',
        lname: 'Nowak'
    }
];

app.get('/', function (request, response) {
    response.render('index', { students: students });
});
app.listen(8000, function () {
    console.log('The server was started on port 8000');
    console.log('To stop the server, press "CTRL + C"');
});
