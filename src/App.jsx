import { useEffect, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"

const initialTodos = JSON.parse(localStorage.getItem('dnd-todos')) || [
  {id: 1, text: 'Aprender React'},
  {id: 2, text: 'Aprender Js'},
  {id: 3, text: 'Aprender Vue.js'}
]

const App = () => { 
 
  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
      localStorage.setItem('dnd-todos', JSON.stringify(todos))
  }, [todos])
  
  const handleDragEnd = (result) => {
    if(!result.destination) {
      return
    }
    
    const startIndex = result.source.index 
    const endIndex = result.destination.index 
    
    let copyArray = [...todos]

    const [reorderedItem] = copyArray.splice(startIndex, 1 )

    // Con el 0 indica que no vamos a eliminar elementos sino a agregar a partir de la posición 'start'.
    copyArray.splice(endIndex, 0, reorderedItem)

    setTodos(copyArray)    
  }

  return (
    <div className="m-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1 className="text-center">Todo App</h1>
      
        <Droppable droppableId="todos">
          {  (droppableProvider) => (
            <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps} className="divide-y divide-gray-200 rounded-md shadow-md">
              {
                todos.map((todo, index) => (
                  <Draggable index={index} key={todo.id} draggableId = {`${todo.id}`}>
                    {
                      (draggableProvider) => (
                        <li 
                        ref={draggableProvider.innerRef}
                        { ...draggableProvider.dragHandleProps }
                        { ...draggableProvider.draggableProps }
                        className="px-4 py-2  bg-gray-100 mt-2"
                        >
                          {todo.text}
                        </li>
                      )
                    }                  
                  </Draggable>
                ))
              }
              {droppableProvider.placeholder}
            </ul>
            )
          }
        </Droppable>
      </DragDropContext>
    </div>
  )
 }

 export default App