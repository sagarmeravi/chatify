import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  message: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    const current = get().isSoundEnabled;
    const next = !current;
    localStorage.setItem("isSoundEnabled", JSON.stringify(next));
    set({ isSoundEnabled: next });
  },
  setActiveTab: (tab) =>
    set({
      activeTab: tab,
    }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },
}));
