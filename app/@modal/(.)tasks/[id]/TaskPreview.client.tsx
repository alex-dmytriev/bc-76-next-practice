"use client";

import css from "./TaskPreview.module.css";

import Modal from " @/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { fetchTaskById } from " @/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const TaskPreview = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };

  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    refetchOnMount: false,
  });

  return (
    <Modal closeModal={handleClose}>
      {task && (
        <div className={css.container}>
          <h2 className={css.title}>{task.title}</h2>{" "}
          <p className={css.description}>{task.description}</p>
          <div className={css.footer}>
            <span className={css.status}>{task.status}</span>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </Modal>
  );
};

export default TaskPreview;
