// Conectar a la base de datos MongoDB EN LA NUBE //////////////////////////////////////////////////////////

const { MongoClient } = require('mongodb');

// Cadena de conexión de MongoDB
const uri = "mongodb://admin:uLmydZa9CiSXRqgy@SG-cluster-dsystem-blog-65178.servers.mongodirector.com:27017/admin";
// Crear un cliente de MongoDB
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connectToDatabase() {
    try {
        // Conectarse a la base de datos
        await client.connect();
        console.log("Connected to MongoDB");

        // Obtener una referencia a la base de datos "system_blog"
        const db = client.db("system_blog");

        // Realizar operaciones CRUD
        const collection = db.collection("users");

        const result = await collection.insertOne({ name: "John Doe" });
        console.log(`Nuevo Dato Insertado con ID: ${result.insertedId}`);
    } catch (err) {
        console.error("Error al conectar:", err);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

connectToDatabase();



// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
    console.log('\x1b[32mServidor Iniciado en el puerto \x1b[0m', port);
});
