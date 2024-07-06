const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/system_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir la estructura de la colección "users"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Crear el modelo de usuario
const User = mongoose.model('users', userSchema);

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

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
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
});

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos' })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY)
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' })
    }
})

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});
