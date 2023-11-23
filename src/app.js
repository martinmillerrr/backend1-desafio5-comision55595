import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { db } from './config/database.js';
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productRoutes from './routes/category.router.js';
import categoryRoutes from './routes/category.router.js';
import customerRoutes from './routes/category.router.js';
import orderRoutes from './routes/category.router.js';

const port = 8080;
const app = express();
const httpServer = app.listen(port, () => { console.log(`Servidor Express escuchando en el puerto ${port}`) });

const io = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
