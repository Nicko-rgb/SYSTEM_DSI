const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');


// Configurar el middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/system_blog');

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
    image: {
        filename: { type: String },
        path: { type: String }
    },
    video: {
        filename: { type: String },
        path: { type: String }
    },
    createdAt: { type: Date, default: Date.now },
    createdAtDate: { type: Date, default: Date.now },
    createdAtTime: {
        type: String, default: () => {
            const date = new Date();
            return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        }
    },
    likes: { type: Number, default: 0 },
    comentarios: [
        {
            usuario: { type: String, required: true }, // Cambiar de mongoose.Schema.Types.ObjectId a String
            texto: { type: String, required: true },
            fecha: { type: Date, default: Date.now }
        }
    ]
});
const Publicacion = mongoose.model('Publicacion', publicationSchema);


//modelo para likes
const likeSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    publicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion', required: true },
    fecha: { type: Date, default: Date.now }
});
const Like = mongoose.model('Like', likeSchema);

// Configurar Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generar un nombre único para el archivo
    }
});

const upload = multer({ storage: storage });

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://tu-dominio-react.com'); // Reemplaza con el dominio de tu aplicación React
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
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

//ruta pa obtener todas las publicaciones
app.get('/api/publicaciones', async (req, res) => {
    try {
        const publicaciones = await Publicacion.find();
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las publicaciones' });
    }
})

// Ruta para guardar una nueva publicación , likes y comentarios
app.post('/api/publicaciones', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), async (req, res) => {
    try {
        const { userName, text, textArchivo } = req.body;
        const image = req.files.image ? req.files.image[0] : null;
        const video = req.files.video ? req.files.video[0] : null;

        const newPublicacion = new Publicacion({
            userName,
            text,
            textArchivo,
            image: image ? { filename: image.filename, path: image.path } : null,
            video: video ? { filename: video.filename, path: video.path } : null,
            likes: 0,
            comentarios: []
        });

        await newPublicacion.save();
        res.status(201).json({ message: 'Publicación enviada' });
        console.log("Nueva Publicación guardada en el servidor");
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar la publicación' });
        console.log("Error al guardar la publicación en el servidor");
    }
});

//para actulizar el numero de likes
app.post('/api/publicaciones/:publicacionId/like', async (req, res) => {
    try {
        const { publicacionId } = req.params;

        // Buscar la publicación por su ID
        const publicacion = await Publicacion.findById(publicacionId);

        // Actualizar el número de likes
        publicacion.likes += 1;
        await publicacion.save();

        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al dar like a la publicación' });
    }
});

//ruta para guardar los comentarios de cada publicacion
app.post('/api/publicaciones/:publicacionId/comentar', async (req, res) => {
    try {
        const { publicacionId } = req.params;
        const { usuario, texto } = req.body;

        // Buscar la publicación por su ID
        const publicacion = await Publicacion.findById(publicacionId);

        // Agregar el comentario a la lista de comentarios
        publicacion.comentarios.push({
            usuario,
            texto,
            fecha: new Date(),
        });

        // Guardar la publicación actualizada
        await publicacion.save();

        // Obtener la publicación actualizada con los comentarios
        const updatedPublicacion = await Publicacion.findById(publicacionId).populate('comentarios.usuario');

        res.status(200).json(updatedPublicacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar comentario a la publicación' });
    }
});

app.get('/api/user/:identifier', async (req, res) => {
    try {
        const identifier = req.params.identifier;
        const user = await User.findOne({
            $or: [
                { name: { $regex: new RegExp(identifier, 'i') } },
                { email: identifier }
            ]
        });
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        res.json({
            nombre: `${user.name} ${user.lastName}`,
            email: user.email
        });
    } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        res.status(500).json({ message: 'Error al obtener los datos del usuario' });
    }
});




// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log('\x1b[32mServidor Iniciado en el puerto \x1b[0m', port);

    
});