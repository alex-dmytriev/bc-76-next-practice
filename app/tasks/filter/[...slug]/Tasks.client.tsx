"use client";

import { fetchedTasks } from " @/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./TaskPage.module.css";
import SearchBox from " @/components/SearchBox/SearchBox";
import Pagination from " @/components/Pagination/Pagination";
import TaskList from " @/components/TaskList/TaskList";
import Loader from " @/components/Loader/Loader";

import Link from "next/link";

interface TasksClientProps {
  status: string;
}

const TasksClient = ({ status }: TasksClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["tasks", page, search, status],
    queryFn: () => fetchedTasks(page, search, status),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSearch = useDebouncedCallback((value: string) => {
    setPage(1);
    setSearch(value);
  }, 300);
  return (
    <div>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={handlePageChange}
          />
        )}
        <Link href={"/tasks/action/create/"} className={css.button}>
          +
        </Link>
      </header>

      {isSuccess && data && data?.tasks.length > 0 ? (
        <TaskList tasks={data.tasks} />
      ) : (
        !isLoading && <p>Tasks not found</p>
      )}
      {isLoading && !data && <Loader />}
    </div>
  );
};

export default TasksClient;
