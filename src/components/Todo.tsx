import React from "react";

interface Props {
    todo: Todo;
    toggleTodo: (id: string) => void;
}

const Todo: React.FC<Props> = ({todo, toggleTodo}) => {
    const handleToogleTodo = () => {
        toggleTodo(todo.id);
    }

    return (
        <div>
            <input type="checkbox" checked={todo.complete} onChange={handleToogleTodo} />
            {todo.name}
        </div>
    );
}

export default Todo;