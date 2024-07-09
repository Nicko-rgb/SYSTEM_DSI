const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/system_blog');

// Definir la estructura de la colección "users"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    isStudent: { type: Boolean, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fecha_registro: { type: Date, default: Date.now }
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

        // Buscar el usuario por el correo electrónico
        const user = await User.findOne({ email });

        // Si no se encuentra el usuario, devolver un error de autenticación
        if (!user) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos (email)' });
        }

        // comparar la contraseña ingresada con la contraseña almacenada
        const isMatch = await bcrypt.compare(password, user.password);

        // Si las contraseñas no coinciden, devolver un error de autenticación
        if (!isMatch) {
            return res.status(401).json({ message: 'Correo electrónico o contraseña incorrectos (password)' });
        }

        // Si las credenciales son válidas, enviar una respuesta exitosa
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


// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log('\x1b[32mServidor Iniciado en el puerto \x1b[0m', port);
    // console.log('\x1b[31mError al conectar con el servidor\nError en configurar MariaDB de MongoDB en server.js\x1b[0m');
});
