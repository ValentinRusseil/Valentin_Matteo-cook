import { Application, oakCors } from './deps.ts';
import Ingredientrouter from './controllers/ingredient.controller.ts';
import RecetteRouter from './controllers/recette.controller.ts';
import { connectDB } from './repositories/mongo.ts';
import { errorMiddleware } from './middleware/errorMiddleware.ts';
await connectDB();

const app = new Application();
app.use(errorMiddleware);
app.use(
    oakCors({
        origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);
app.use(Ingredientrouter.routes());
app.use(Ingredientrouter.allowedMethods());
app.use(RecetteRouter.routes());
app.use(RecetteRouter.allowedMethods());

const port = 8000;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port: port });
