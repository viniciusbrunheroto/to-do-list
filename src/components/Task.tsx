import { Trash } from "phosphor-react";
import styles from "./Task.module.css";
import { useState } from "react";


interface TaskProps {
    id: number,
    content: string;
    onDeleteTask: (task:string) => void
    onCompleteTask: (task:string) => void
    onUncompleteTask: (task:string) => void
}

export function Task ({id, content, onDeleteTask, onCompleteTask, onUncompleteTask }: TaskProps) {

    const [isChecked, setIsChecked] = useState<boolean>(false)


    function handleDeleteTask () {
        onDeleteTask(content)
    }

    function handleCheckBoxCheck() {
      if (!isChecked){
        setIsChecked(true)
        onCompleteTask(content)
      }else {
        setIsChecked(false)
        onUncompleteTask(content)
      }
    }

    return(
        <div className={styles.oneTask}>
          <div className={styles.oneTaskCheck}>
            <input type="checkbox" id={`checkbox-${id}`} onClick={handleCheckBoxCheck} className={styles.checkbox} />
            <label htmlFor={`checkbox-${id}`} className={`${isChecked ? `${styles.customCheckboxMarked}` : `${styles.customCheckbox}`}`}>
            </label>
          </div> 
         <div className={`${isChecked ? `${styles.oneTaskDescriptionMarked}` : `${styles.oneTaskDescription}`} `}>
            <p>{content}</p>
          </div>
          <div className={styles.oneTaskIcon}>
            <button title="Deletar tarefa" onClick={handleDeleteTask}>
              <Trash size={16}/>
            </button>
          </div>
        </div>
    )
}