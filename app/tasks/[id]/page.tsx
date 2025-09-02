import { fetchTaskById } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TaskDetailsClient from "./TaskDetails.client";
import { Metadata } from "next";

interface TaskDetailProps {
  params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
  params,
}: TaskDetailProps): Promise<Metadata> => {
  const { id } = await params;
  const task = await fetchTaskById(id);
  return {
    title: task.title,
    description: task.description.slice(0, 15),
    openGraph: {
      title: task.title,
      description: task.description.slice(0, 15),
      url: `https://bc-76-next-practice.vercel.app/tasks/${id}`,
      images: [
        {
          url: "https://images.pexels.com/photos/7376/startup-photos.jpg",
          width: 1200,
          height: 630,
          alt: task.title,
        },
      ],
    },
  };
};

const TaskDetails = async ({ params }: TaskDetailProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskDetailsClient />
    </HydrationBoundary>
  );
};

export default TaskDetails;
