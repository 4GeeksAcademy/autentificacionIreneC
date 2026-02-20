export const initialStore=()=>{
  return{
    
    token: sessionStorage.getItem("token") || null, // Recupera el token si existe al cargar la app
    user: null,
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){


    case 'login':
      // Guardamos el token en sessionStorage 
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user
      };

    case 'logout':
      // 1. Eliminamos el token del sessionStorage
      sessionStorage.removeItem("token");
      // 2. Limpiamos el estado global
      return {
        ...store,
        token: null,
        user: null
      };

    case 'set_user':
      return {
        ...store,
        user: action.payload
      };

  // --- ESTOS CASOS YA ESTABAN EN EL EJERCICIO!! ---
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
