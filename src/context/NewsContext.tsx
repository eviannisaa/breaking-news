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
   source: SourceData;
}

interface SourceData {
   id: string;
   name: string;
}

interface NewsContextProps {
   news: NewItem[];
   filteredNews: NewItem[];
   bookMark: (newItem: NewItem) => Promise<void>;
   isLoading: boolean;
   searchNews: (q: string) => void;
   bookmarkedIds: string[];
   setBookmarkedIds: (ids: any) => void;
   toggleBookmark: (item: any) => void;
   formatDate: (dateString: string) => React.ReactNode;
   bookmarkedNews: string[];
   setBookmarkedNews: any;
   removeItem: (title: string) => void;
   clearAll: () => void;
}

const NewsContext = createContext<NewsContextProps | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const { toast } = useToast();
   const [news, setNews] = useState<NewItem[]>([]);
   const [filteredNews, setFilteredNews] = useState<NewItem[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [, setIsBookmarkedNews] = useState<NewItem[]>([]);
   const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
   const [bookmarkedNews, setBookmarkedNews] = useState<any[]>([]);
   // const bookmarkedNews = JSON.parse(localStorage.getItem("bookmarkedIds") || "[]")

   useEffect(() => {
      const storedBookmarks = localStorage.getItem("bookmarkedIds");
      if (storedBookmarks) {
         setBookmarkedIds(JSON.parse(storedBookmarks));
      }
   }, []);

   useEffect(() => {
      const fetchNews = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get(
               "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b6e6f159ce0b457e971b90aaf3525f9b",
            );
            setNews(response.data.articles);
            setFilteredNews(response.data.articles);
         } catch (error) {
            console.error("error fetching news", error);
         } finally {
            setIsLoading(false);
         }
      };

      fetchNews();
   }, []);

   const searchNews = (q: string) => {
      const query = q.trim().toLowerCase();
      const matchQuery = (str: string) => str.toLowerCase().includes(query);

      if (!query) {
         setFilteredNews(news);
         return;
      }

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

      setFilteredNews(filteredNews);
   };

   const bookMark = async (newItem: NewItem) => {
      setIsBookmarkedNews((prev) => [...prev, newItem]);
   };

   const toggleBookmark = async (item: any) => {
      const storedIds = JSON.parse(localStorage.getItem("bookmarkedIds") || "[]");
      // find item
      const itemIndex = storedIds.findIndex(
         (title: any) => title.title === item.title,
      );

      if (itemIndex !== -1) {
         // if item exists, delete from activity
         const updatedIds = storedIds.filter(
            (_: any, index: any) => index !== itemIndex,
         );
         localStorage.setItem("bookmarkedIds", JSON.stringify(updatedIds));
         setIsBookmarkedNews(updatedIds);
      }

      // Add the item back with the latest timestamp.
      const updatedIds = [
         // make sure old item not exists
         ...storedIds.filter((_: any, index: any) => index !== itemIndex),
         {
            url: item.url,
            timestamp: Date.now(),
            image: item.urlToImage,
            title: item.title,
         },
      ];

      localStorage.setItem("bookmarkedIds", JSON.stringify(updatedIds));
      setIsBookmarkedNews(updatedIds);
   };

   const removeItem = (title: string) => {
      const updatedNews = bookmarkedNews.filter(
         (item: any) => item.title !== title,
      );
      setBookmarkedNews(updatedNews);
      localStorage.setItem("bookmarkedIds", JSON.stringify(updatedNews));

      toast({ description: "The news item has been successfully deleted." });
   };

   const clearAll = () => {
      setBookmarkedNews([]);
      localStorage.removeItem("bookmarkedIds");

      toast({ description: "All news items have been successfully deleted." });
   };

   const formatDate = (dateString: string): string => {
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
            filteredNews,
            bookMark,
            isLoading,
            searchNews,
            bookmarkedIds,
            setBookmarkedIds,
            toggleBookmark,
            formatDate,
            bookmarkedNews,
            setBookmarkedNews,
            removeItem,
            clearAll,
         }}
      >
         {children}
      </NewsContext.Provider>
   );
};

export const useNews = () => useContext(NewsContext)!;
