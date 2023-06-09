import { db } from "../utils/firebase"
import { doc, getDoc, getDocs, collection, addDoc, updateDoc, deleteDoc} from "firebase/firestore";

const tasksCollectionRef = collection(db, "tasks");

class TaskService{

    getTask = (id) => {
        const taskDoc = doc(db, "tasks", id);
        return getDoc(taskDoc);
    }

    getAllTasks = () => {
        return getDocs(tasksCollectionRef);
    }

    addTasks = (newTask) => {
        return addDoc(tasksCollectionRef, newTask);
    }

    updateTask = (id, updatedTask) => {
        const taskDoc = doc(db, "tasks", id);
        return updateDoc(taskDoc, updatedTask);
    }

    deleteTask = (id) => {
        const taskDoc = doc(db, "tasks", id);
        return deleteDoc(taskDoc);
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TaskService();