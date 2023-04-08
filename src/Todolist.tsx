import React from "react";
import { FilteredValueType } from "./App";

type PropsType ={
    title : string;
    tasks:Array <TasksType>;
    removeTask : (taskId : number) => void;
    changeFilter: (value:FilteredValueType) => void;
}
export type TasksType ={
    id : number;
    title : string ;
    isDone : boolean;
}

 export function Todolist(props :PropsType){
     
    return (
         <div>
    <h3>{props.title}</h3>
    <div>
        <input/>
        <button>+</button>
    </div>
    <ul>
        {props.tasks.map((task)=>{
            return (
                <li key ={task.id}>
                    <input type="checkbox" checked={task.isDone}/> 
                    <span>{task.title}</span> 
                    <button onClick={()=> {props.removeTask(task.id)}}>x</button>
            </li>
            )
        })}       
    </ul>
    <div>
        <button onClick={()=>{props.changeFilter('all')}}>All</button>
        <button onClick={()=>{props.changeFilter('active')}}>Active</button>
        <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
    </div>
</div>
    )
}
