import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import { fetchedTasks } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksClient from "./Tasks.client";

interface TasksProps {
  params: Promise<{ slug: string[] }>;
}

const Tasks = async ({ params }: TasksProps) => {
  const { slug } = await params;
  const status = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchedTasks(1, "", status),
  });
  return (
    <Section>
      <Container>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TasksClient status={status} />
        </HydrationBoundary>
      </Container>
    </Section>
  );
};

export default Tasks;
