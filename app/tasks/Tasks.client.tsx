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
import ErrorMessage from " @/components/ErrorMessage/ErrorMessage";
import Modal from " @/components/Modal/Modal";
import TaskForm from " @/components/TaskForm/TaskForm";

const TasksClient = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["tasks", page, search],
    queryFn: () => fetchedTasks(page, search),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(isLoading);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
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
        <button onClick={handleOpenModal} type="button" className={css.button}>
          +
        </button>
      </header>

      {isSuccess && data && data?.tasks.length > 0 ? (
        <TaskList tasks={data.tasks} />
      ) : (
        !isLoading && <p>Tasks not found</p>
      )}
      {isLoading && !data && <Loader />}
      {/* {isError && <ErrorMessage />} */}
      {modalIsOpen && (
        <Modal closeModal={handleCloseModal}>
          <TaskForm closeModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

export default TasksClient;
