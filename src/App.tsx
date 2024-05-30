import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import Clipboard from './assets/Clipboard.svg'
import { PlusCircle } from "phosphor-react";
import { Task } from "./components/Task";
import { ChangeEvent, FormEvent, useState } from "react";



export function App() {
  const [tasks, setTasks] = useState(["Desenvolver uma aplicação", "Estudar"])

  const [newTask, setNewTask] = useState("")

  const [completedTasks, setCompletedTasks] = useState([""])


  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault()

    setTasks((state) => [...state, newTask])
    setNewTask("")

  }

  function deleteTask(taskToDelete: string){
    const taskListWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete;
    })
    setTasks(taskListWithoutDeletedOne)

    //retira a tarefa da lista de completas, caso ela esteja ali
    const completedTaskListWithoutDeletedTask = completedTasks.filter(task => {
      return task !== taskToDelete
    })

    setCompletedTasks(completedTaskListWithoutDeletedTask)

  }

  function completeTask(taskCompleted: string){

    //adiciona a tarefa na lista de tarefas completas
      setCompletedTasks((state) => [...state, taskCompleted])
  }

  function uncompleteTask(taskUncompleted: string){
    const completedTaskListWithoutUncompletedOne = completedTasks.filter(task => {
      return task !== taskUncompleted;
    })
  
    //retira a tarefa da lista de tarefas completas
    setCompletedTasks(completedTaskListWithoutUncompletedOne)

  }

  function handleNewTaskChange ( event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value)
  }


  return (
  <div>
    <Header />
      <main className={styles.wrapper}>
      <form onSubmit={handleCreateNewTask} className={styles.inputArea}>
            <input
            type="text"
            placeholder="Adicione uma nova tarefa" 
            value={newTask}
            onChange={handleNewTaskChange}
            required
            />

            <button type="submit" >
                Criar
                <PlusCircle size={20} />
            </button>
        </form>
          <div className={styles.taskList}>
            <div className={styles.infoTaskList}>
                <div className={styles.tasksCreated}>
                  <p>Tarefas criadas</p>
                  <span>{tasks.length}</span>
                </div>
                <div className={styles.tasksFinished}>
                  <p>Concluídas</p>
                  
                  
                  { (completedTasks.length-1 !== 0) ?
                  (
                    <span>{completedTasks.length-1} de {tasks.length}</span>
                  ) : (
                  <span>0</span>
                  )
                  }
                </div>
             </div>

            { tasks.length !== 0 ? 
            
              (tasks.map( (task, index) => {
                return(
                    <Task 
                    key={task}
                    id={index}
                    content={task}
                    onDeleteTask={deleteTask}
                    onCompleteTask={completeTask}
                    onUncompleteTask={uncompleteTask}
                    />
                )
              })
            ) :
            ( 
            <div className={styles.noTasks}>
              <img 
              src={Clipboard} 
              alt="Logotipo do To-Do List" 
              width={56} 
              height={56}/>
              <div>
                  <p className={styles.innerText}>Você ainda não tem tarefas cadastradas</p>
                  <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
            )
          } 
        </div>
      </main>
  </div>
  )
}

