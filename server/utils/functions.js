import { db } from '../db/index.js';
import { todosTable } from '../db/schema.js';
import { eq, ilike } from 'drizzle-orm';

async function getAllTodos() {
    const todos = await db.select().from(todosTable);
    return todos;
}

async function createTodo(todo) {
    await db.insert(todosTable).values({
        todo,
    });
}

async function searchTodo(search) {
    const todo = await db
        .select()
        .from(todosTable)
        .where(ilike(todosTable.todo, search));

    return todo;
}

async function deleteTodoById(id){
    await db.delete(todosTable).where(eq(todosTable.id, id));
}

export {
    getAllTodos,
    createTodo,
    searchTodo,
    deleteTodoById
};