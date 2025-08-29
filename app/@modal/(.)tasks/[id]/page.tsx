import TaskPreview from "./TaskPreview.client";
import { fetchTaskById } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface TaskPreviewPageProps {
  params: Promise<{ id: string }>;
}

const TaskPreviewPage = async ({ params }: TaskPreviewPageProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskPreview />
    </HydrationBoundary>
  );
};

export default TaskPreviewPage;
