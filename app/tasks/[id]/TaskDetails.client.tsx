"use client";

import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import { fetchTaskById } from " @/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./TaskDetails.module.css";
import Loader from " @/components/Loader/Loader";

const TaskDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    refetchOnMount: false,
  });

  return (
    <Section>
      <Container>
        {task && (
          <div className={css.container}>
            <h2 className={css.title}>{task.title}</h2>{" "}
            <p className={css.description}>{task.description}</p>
            <div className={css.footer}>
              <span className={css.status}>{task.status}</span>
            </div>
          </div>
        )}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};

export default TaskDetailsClient;
