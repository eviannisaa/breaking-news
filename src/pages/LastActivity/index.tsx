import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import { TrashIcon } from "@radix-ui/react-icons";
import { useNews } from "@/context/NewsContext";

interface LastActivityProps {
   children: React.ReactNode;
}

const LastActivity: React.FC<LastActivityProps> = ({ children }) => {
   const { bookmarkedNews, setBookmarkedNews, removeItem, clearAll } = useNews();
   const [showSelectRemove, setShowSelectRemove] = useState(false);

   useEffect(() => {
      const storedNews = JSON.parse(
         localStorage.getItem("bookmarkedIds") || "[]",
      );
      setBookmarkedNews(storedNews);
   }, [bookmarkedNews]);

   return (
      <div>
         <Sheet onOpenChange={() => setShowSelectRemove(false)}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
               <SheetHeader>
                  <SheetTitle>The Last News Read</SheetTitle>
               </SheetHeader>

               {bookmarkedNews.length > 0 && (
                  <div className="flex gap-4 justify-end my-6">
                     <Button size="sm" onClick={clearAll}>
                        Clear All
                     </Button>
                     <Button
                        size="sm"
                        variant={showSelectRemove ? "destructive" : "default"}
                        onClick={() => {
                           setShowSelectRemove(!showSelectRemove);
                        }}
                     >
                        {showSelectRemove ? "Cancel" : "Remove Item"}
                     </Button>
                  </div>
               )}

               {bookmarkedNews.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3 mt-6 max-h-[82%] overflow-y-auto">
                     {bookmarkedNews
                        .sort((a: any, b: any) => b.timestamp - a.timestamp)
                        .map((item: any, i: any) => (
                           <div
                              key={i}
                              className={`grid items-center ${showSelectRemove ? "grid-cols-[80%_20%]" : "grid-cols-1"
                                 }`}
                           >
                              <Card key={i} className="pb-2 border border-gray-400 p-3">
                                 <img
                                    src={item.image}
                                    alt="news bookmark"
                                    className="h-32 w-full rounded-lg object-cover"
                                 />
                                 <div className="text-xs mt-2">
                                    <p className="truncate mb-1 font-medium">
                                       {item.title}
                                    </p>
                                    <a
                                       href={item.url}
                                       target="_blank"
                                       className="flex justify-end underline text-[10px] text-blue-800 font-medium"
                                    >
                                       Read More
                                    </a>
                                 </div>
                              </Card>

                              {showSelectRemove && (
                                 <div className="flex justify-center w-full">
                                    <Button
                                       variant="destructive"
                                       size="icon"
                                       onClick={() => removeItem(item.title)}
                                    >
                                       <TrashIcon />
                                    </Button>
                                 </div>
                              )}
                           </div>
                        ))}
                  </div>
               ) : (
                  <div className="w-full h-96 flex justify-center items-center">
                     No bookmarks found.
                  </div>
               )}
            </SheetContent>
         </Sheet>
      </div>
   );
};

export default LastActivity;
