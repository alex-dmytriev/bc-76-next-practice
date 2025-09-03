import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import TaskForm from " @/components/TaskForm/TaskForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Task",
  description: "Create a new task in TaskHub",
  openGraph: {
    title: "Create Task",
    description: "Create a new task in TaskHub",
    url: "https://bc-76-next-practice.vercel.app/tasks/action/create",
    images: [
      {
        url: "https://images.pexels.com/photos/7376/startup-photos.jpg",
        width: 1200,
        height: 630,
        alt: "Create Task",
      },
    ],
  },
};

const CreateTask = () => {
  return (
    <Section>
      <Container>
        <TaskForm />
      </Container>
    </Section>
  );
};

export default CreateTask;
