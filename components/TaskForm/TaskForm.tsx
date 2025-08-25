import { Field, Form, Formik, ErrorMessage, type FormikHelpers } from "formik";
import * as Yup from "yup";
import css from "./TaskForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../../services/tasks";
interface FormValues {
  title: string;
  description: string;
  status: string;
}

interface TaskFormProps {
  closeModal: () => void;
}

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must have min 2 characters")
    .max(10, "Title must have max 10 characters")
    .required("Required"),
  description: Yup.string()
    .min(2, "Description must have min 2 characters")
    .max(50, "Description must have max 50 characters")
    .required("Required"),
  status: Yup.string()
    .oneOf(["todo", "in-progress", "review", "done", "blocked", "canceled"])
    .required("Required"),
});
export default function TaskForm({ closeModal }: TaskFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      closeModal();
    },
  });
  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    mutation.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={{ title: "", description: "", status: "todo" }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <label className={css.formGroup}>
          Title
          <Field className={css.input} name="title" type="text" />
          <ErrorMessage className={css.error} name="title" component="span" />
        </label>
        <label className={css.formGroup}>
          Description
          <Field className={css.input} name="description" type="text" />
          <ErrorMessage
            className={css.error}
            name="description"
            component="span"
          />
        </label>
        <label className={css.formGroup}>
          Status
          <Field className={css.input} as="select" name="status" type="text">
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
            <option value="blocked">Blocked</option>
            <option value="canceled">Canceled</option>
          </Field>
          <ErrorMessage className={css.error} name="status" component="span" />
        </label>
        <button type="submit" className={css.submitButton}>
          Submit
        </button>
      </Form>
    </Formik>
  );
}
