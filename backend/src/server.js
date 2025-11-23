import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js"; 
import courseRoutes from "./routes/course.routes.js"; 
import requestRoutes from "./routes/request.routes.js"
import graphqlRoute from "./graphql/index.js"


const app = express();

const allowedOrigin = process.env.CORS_ORIGIN

// Middleware para leer JSON
app.use(express.json());

app.use(cors({
  origin: allowedOrigin, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Rutas
app.use(authRoutes);
app.use( courseRoutes);
app.use(requestRoutes)
app.use(graphqlRoute)

// Puerto
const PORT = process.env.PORT || 3000;

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
