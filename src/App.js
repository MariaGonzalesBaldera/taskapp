import { useState, useEffect } from "react";
function App() {
  const [tasks, setTasks] = useState({});
  
  async function getTasks(){
    try{
      const response = await fetch('http://127.0.0.1:8000/api/tasks/')
      const data = await (response).json();
      if (data){
        setTasks(data);
      }
    }catch (error){
      console.log(error);
    }
  }

  async function postTask(body){
    try{
      const response = await fetch('http://127.0.0.1:8000/api/tasks/',{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await  response.json();
      if (data){
        console.log(data);
      }
    }catch (error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getTasks();
  }, []);

  return (
    <div className="container-sm mt-5">
        <h1 className="display-3">Todo App</h1>
        <hr/>

        <div className="card p-3 shadow">
            <div className="input-group mb-0">
            <input type="text" name="nombre" className="form-control" placeholder="new task" autoComplete="off" onChange={(event)=>{ 
                if (event.target.value!==""){
                setTasks({
                  ...tasks,nombre: event.target.value,
                });
              }
              }}
              />
              <input type="number" name="prioridad" className="form-control" placeholder="priority (1,2,3)" autoComplete="off" onChange={(event)=>{ 
                if (event.target.value!==""){
                setTasks({
                  ...tasks,prioridad: event.target.value,
                });
              }
              }}
              />
              <button className="btn btn-primary" onClick={async()=>{ await postTask(tasks); await getTasks(); }}>Add</button>
            </div>
        </div>
        <hr/>
        <ul className="list-group shadow">
          {tasks &&
          tasks.length > 0 && 
          tasks.map((task,index)=>{
            return (
              <li key={index} className='list-group-item'>
                {task.nombre} / {task.prioridad}

              </li>
            );
          })}
        </ul>
    </div>
  );
}

export default App;
