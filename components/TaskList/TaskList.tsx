import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../../types/type";
import css from "./TasksList.module.css";
import { deleteTask } from "../../services/tasks";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return (
    <ul className={css.list}>
      {tasks.map((task) => (
        <li key={task.id} className={css.listItem}>
          <h2 className={css.title}>{task.title}</h2>{" "}
          <p className={css.description}>{task.description}</p>
          <div className={css.footer}>
            <span className={css.status}>{task.status}</span>
            <button
              className={css.button}
              onClick={() => mutation.mutate(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
