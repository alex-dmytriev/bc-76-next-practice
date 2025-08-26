import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import { fetchedTasks } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksClient from "./Tasks.client";

const Tasks = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchedTasks(1, ""),
  });
  return (
    <Section>
      <Container>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TasksClient />
        </HydrationBoundary>
      </Container>
    </Section>
  );
};

export default Tasks;
