import { NewTask } from " @/types/task";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskDraftStore = {
  draft: NewTask;
  setDraft: (note: NewTask) => void;
  clearDraft: () => void;
};

const initialDraft: NewTask = {
  title: "",
  description: "",
  status: "",
};

export const useTaskDraftStore = create<TaskDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (task) => set(() => ({ draft: task })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "task-draft",

      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
