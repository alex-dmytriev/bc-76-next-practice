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
  return <div>CreateTask</div>;
};

export default CreateTask;
