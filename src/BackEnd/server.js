const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');

// Conectar a la base de datos MongoDB y configurar GridFS
mongoose.connect('mongodb://localhost/system_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
mongoose.connection.once('open', () => {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Definir la estructura para registrar usuario en la colección "users"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now }
});
const User = mongoose.model('users', userSchema);

// Definir el modelo para registrar las publicaciones de los usuarios
const publicationSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    text: { type: String },
    textArchivo: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    createdAtDate: { type: Date, default: Date.now },
    createdAtTime: {
        type: String, default: () => {
            const date = new Date();
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    }
});
const Publicacion = mongoose.model('Publicacion', publicationSchema);

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Multer para usar GridFS como almacenamiento
const storage = new GridFsStorage({
    url: 'mongodb://localhost/system_blog',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });

// Configurar CORS
app.use(cors());

// Ruta para obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
});

// Ruta para crear un nuevo usuario
app.post('/api/users', async (req, res) => {
    try {
        const { name, lastName, phone, isStudent, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            lastName,
            phone,
            isStudent,
            email,
            password: hashedPassword
        });
        console.log(newUser);
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
        console.log("Nuevo Usuario Registrado con Exito server.js");
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
        console.log("Error al Registrar Nuevo Usuario");
    }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos (email)' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos (password)' });
        }
        res.json({
            message: 'Inicio de sesión exitoso',
            name: `${user.name} ${user.lastName}`
        });
        console.log("Inicio de Sesion de usuario Exitoso server.js");
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Ruta para guardar una nueva publicación
app.post('/api/publicaciones', upload.single('file'), async (req, res) => {
    try {
        const { userName, text, textArchivo } = req.body;
        const newPublicacion = new Publicacion({
            userName,
            text,
            textArchivo,
            image: req.file ? req.file.filename : null
        });
        await newPublicacion.save();
        res.status(201).json({ message: 'Publicación enviada' });
        console.log("Nueva Publicación guardada en el servidor");
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar la publicación' });
        console.log("Error al guardar la publicación en el servidor");
    }
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log('\x1b[32mServidor Iniciado en el puerto \x1b[0m', port);
});