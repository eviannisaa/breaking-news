import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface NewItem {
   author: string;
   content: string;
   description: string;
   publishedAt: string;
   title: string;
   url: string;
   urlToImage: string;
   source: SourceItem;
}

interface SourceItem {
   id: string;
   name: string;
}

interface NewsContextProps {
   news: NewItem[];
   isLoading: boolean;
   searchQuery: string;
   setSearchQuery: (e: any) => void;
   isSearching: boolean;
   handleSearch: (q: string) => void;
   handleReset: () => void;
   formatDate: (dateString: string) => React.ReactNode;
   activity: NewItem[];
   setActivity: (item: []) => void;
   toggleBookmark: (item: NewItem) => void;
   removeItem: (title: string) => void;
   clearAll: () => void;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const { toast } = useToast();
   const [news, setNews] = useState<NewItem[]>([]);
   const [originalNews, setOriginalNews] = useState<NewItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearching, setIsSearching] = useState(false);
   const [activity, setActivity] = useState<NewItem[]>([]);

   useEffect(() => {
      const fetchNews = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get(
               "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b6e6f159ce0b457e971b90aaf3525f9b",
            );
            setNews(response.data.articles);
            setOriginalNews(response.data.articles);
         } catch (error) {
            console.error("error fetching news", error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchNews();
   }, []);

   const handleSearch = (q: string) => {
      setIsSearching(true);
      const query = q.trim().toLowerCase();
      const matchQuery = (str: string) => str.toLowerCase().includes(query);
      const filteredNews = news.filter((newItem) => {
         return (
            matchQuery(newItem.author) ||
            matchQuery(newItem.content) ||
            matchQuery(newItem.description) ||
            matchQuery(newItem.publishedAt) ||
            matchQuery(newItem.title) ||
            matchQuery(newItem.url)
         );
      });
      setNews(filteredNews);
      setTimeout(() => {
         setIsSearching(false);
      }, 500);
   };

   const handleReset = () => {
      setSearchQuery("");
      setNews(originalNews);
   };

   const toggleBookmark = async (item: NewItem) => {
      const store = JSON.parse(localStorage.getItem("lastActivity") || "[]");
      const findItem = store.findIndex(
         (title: any) => title.title === item.title,
      );

      if (findItem !== -1) {
         const updatedItem = store.filter(
            (_: any, index: any) => index !== findItem,
         );
         localStorage.setItem("lastActivity", JSON.stringify(updatedItem));
         setActivity(updatedItem);
      } else {
         const updatedItem = [
            ...store.filter((_: any, index: any) => index !== findItem),
            {
               url: item.url,
               timestamp: Date.now(),
               image: item.urlToImage,
               title: item.title,
            },
         ];

         localStorage.setItem("lastActivity", JSON.stringify(updatedItem));
         setActivity(updatedItem);
      }
   };

   const removeItem = (title: string) => {
      const updatedItem = activity.filter((item: any) => item.title !== title);
      setActivity(updatedItem);
      localStorage.setItem("lastActivity", JSON.stringify(updatedItem));
      toast({ description: "The news item has been successfully deleted." });
   };

   const clearAll = () => {
      // setActivity([]);
      localStorage.removeItem("lastActivity");
      toast({ description: "All news items have been successfully deleted." });
   };

   const formatDate = (dateString: string) => {
      const date = new Date(dateString);

      const options: Intl.DateTimeFormatOptions = {
         weekday: "short",
         // year: 'numeric',
         month: "long",
         day: "numeric",
      };

      const formattedDate = date.toLocaleDateString("id-ID", options);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${formattedDate.replace(",", "")} ${hours}.${minutes}`;
   };

   return (
      <NewsContext.Provider
         value={{
            news,
            isLoading,
            searchQuery,
            setSearchQuery,
            isSearching,
            handleSearch,
            handleReset,
            formatDate,
            activity,
            setActivity,
            toggleBookmark,
            removeItem,
            clearAll,
         }}
      >
         {children}
      </NewsContext.Provider>
   );
};

export const useNews = () => useContext(NewsContext)!;
