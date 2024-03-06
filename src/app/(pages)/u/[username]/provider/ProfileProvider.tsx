import axiosInstance from "@/shared/helpers/axiosInstance";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaCommentsDollar } from "react-icons/fa";

type ProfileContextType = {
  user: any;
  posts: any;
  setUser: any;
  refetch: any;
  isLoading: any;
};

const profileContext = createContext<ProfileContextType>(
  {} as ProfileContextType
);

export const useProfile = () => {
  return useContext(profileContext);
};

export const ProfileProvider = ({ children }: any) => {
  const { username } = useParams();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState();

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get(`/user/${username}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get(
        `/post/getPostsByUsername?username=${username}`
      );
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  return (
    <profileContext.Provider value={{ user, posts } as ProfileContextType}>
      {children}
    </profileContext.Provider>
  );
};
