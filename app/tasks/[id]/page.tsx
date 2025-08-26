import { fetchTaskById } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TaskDetailsClient from "./TaskDetails.client";

interface TaskDetailProps {
  params: Promise<{ id: string }>;
}
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
