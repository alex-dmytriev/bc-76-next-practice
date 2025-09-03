"use client";

import css from "./TaskForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from " @/lib/api";
import { NewTask } from " @/types/task";

import { useRouter } from "next/navigation";
import { useTaskDraftStore } from " @/lib/store/taskStore";

export default function TaskForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.back();
      clearDraft();
    },
  });

  const { draft, setDraft, clearDraft } = useTaskDraftStore();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewTask;
    mutation.mutate(values);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.title}
          name="title"
          type="text"
        />
      </label>
      <label className={css.formGroup}>
        Description
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.description}
          name="description"
          type="text"
        />
      </label>
      <label className={css.formGroup}>
        Status
        <select
          className={css.input}
          onChange={handleChange}
          value={draft.status}
          name="status"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
          <option value="canceled">Canceled</option>
        </select>
      </label>
      <button type="submit" className={css.submitButton}>
        Submit
      </button>
    </form>
  );
}
