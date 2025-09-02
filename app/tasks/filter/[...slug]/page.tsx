import Container from " @/components/Container/Container";
import Section from " @/components/Section/Section";
import { fetchedTasks } from " @/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TasksClient from "./Tasks.client";
import { Metadata } from "next";

interface TasksProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: TasksProps): Promise<Metadata> => {
  const { slug } = await params;
  return {
    title: slug[0] === "All" ? "All tasks" : `${slug[0]} tasks`,
    description:
      slug[0] === "All" ? "All tasks" : `Tasks with status ${slug[0]}`,
    openGraph: {
      title: slug[0] === "All" ? "All tasks" : `${slug[0]} tasks`,
      description:
        slug[0] === "All" ? "All tasks" : `Tasks with status ${slug[0]}`,
      url: `https://bc-76-next-practice.vercel.app/tasks/filter/${slug[0]}`,
      images: [
        {
          url: "https://images.pexels.com/photos/7376/startup-photos.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === "All" ? "All tasks" : `${slug[0]} tasks`,
        },
      ],
    },
  };
};

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
