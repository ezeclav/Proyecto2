import dotenv from 'dotenv';
import express from 'express';
import getPool from './getPool.js';

dotenv.config();

const app = express();

app.use(express.json());





/*   

// Middleware que retorna el listado de posts.
app.get('/posts', async (req, res, next) => {
    try {
        const pool = await getPool();

        const [posts] = await pool.query('SELECT * FROM posts');

        if (posts.length < 1) {
            const err = new Error('No se ha encontrado ningún post');
            err.httpStatus = 404;
            throw err;
        }

        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
});

// Middleware que retorna un post por ID.
app.get('/posts/:postId', async (req, res, next) => {
    try {
        const pool = await getPool();

        const { postId } = req.params;

        const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [
            postId,
        ]);

        if (posts.length < 1) {
            const err = new Error('Post no encontrado');
            err.httpStatus = 404;
            throw err;
        }

        res.send({
            status: 'ok',
            data: {
                // Si el post que buscamos existe, estará en la posición 0 del array de posts.
                post: posts[0],
            },
        });
    } catch (err) {
        next(err);
    }
});

// Middleware que crea un nuevo post.
app.post('/posts', async (req, res, next) => {
    try {
        const pool = await getPool();

        const { title, content } = req.body;

        if (!title || !content) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }

        await pool.query('INSERT INTO posts (title, content) VALUES (?, ?)', [
            title,
            content,
        ]);

        res.send({
            status: 'ok',
            message: 'Post creado',
        });
    } catch (err) {
        next(err);
    }
});

// Middleware que actualiza un post.
app.put('/posts/:postId', async (req, res, next) => {
    try {
        const pool = await getPool();

        const { postId } = req.params;

        let { title, content } = req.body;

        if (!title && !content) {
            const err = new Error('Faltan campos');
            err.httpStatus = 400;
            throw err;
        }

        const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [
            postId,
        ]);

        if (posts.length < 1) {
            const err = new Error('Post no encontrado');
            err.httpStatus = 404;
            throw err;
        }

        title = title || posts[0].title;
        content = content || posts[0].content;

        await pool.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, postId],
        );

        res.send({
            status: 'ok',
            message: 'Post actualizado',
        });
    } catch (err) {
        next(err);
    }
});

// Middleware que elimina un post.
app.delete('/posts/:postId', async (req, res, next) => {
    try {
        const pool = await getPool();

        const { postId } = req.params;

        const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [
            postId,
        ]);

        if (posts.length < 1) {
            const err = new Error('Post no encontrado');
            err.httpStatus = 404;
            throw err;
        }

        await pool.query(`DELETE FROM posts WHERE id = ?`, [postId]);

        res.send({
            status: 'ok',
            message: 'Post eliminado',
        });
    } catch (err) {
        next(err);
    }
});

// Middleware de manejo de errores.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Iniciamos el servidor.
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});

 */