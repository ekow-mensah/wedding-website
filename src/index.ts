import express from 'express';
import cors from 'cors';
import {json, urlencoded} from 'body-parser';
import helmet from 'helmet';
import nunjucks from 'nunjucks';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'html');
app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded({extended: true}));
app.use(express.static('public'));
nunjucks.configure('src/views', {autoescape: true, express: app});

app.get('/', (req, res) => {
    return res.render('index');
});

app.listen(PORT);


