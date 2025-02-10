import { db } from '../db/index.js';
import { todosTable } from '../db/schema.js';
import { eq, ilike } from 'drizzle-orm';

async function getAllTodos() {
    const todos = await db.select().from(todosTable);
    return todos;
}

async function createTodo(todo) {
    const [result] = await db.insert(todosTable).values({
        todo,
    }).returning({
        id: todosTable.id,
    });

    return result.id;
}

async function searchTodo(search) {
    const todo = await db
        .select()
        .from(todosTable)
        .where(ilike(todosTable.todo, `%${search}%`));

    return todo;
}

async function updateTodo(metadata) {
    const { id, newTodo } = metadata;

    if (!newTodo || typeof newTodo !== 'string' || newTodo.trim() === '') {
        console.log(newTodo);
        throw new Error('Invalid newTodo value. It must be a non-empty string.');
    }

    const result = await db
        .update(todosTable)
        .set({
            todo: newTodo
        })
        .where(eq(todosTable.id, id));

    return result;
}

async function deleteTodoById(id) {
    await db.delete(todosTable).where(eq(todosTable.id, id));
}

const tools = {
    getAllTodos: getAllTodos,
    createTodo: createTodo,
    searchTodo: searchTodo,
    updateTodo: updateTodo,
    deleteTodoById: deleteTodoById
};

export {
    getAllTodos,
    createTodo,
    searchTodo,
    deleteTodoById,
    tools
};