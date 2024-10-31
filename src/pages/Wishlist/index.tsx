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
import { useProducts } from "@/context/ProductsContext";
import { formatAmount } from "@/lib/formatAmount";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { WishlistSkeleton } from "@/components/ui/skeleton";

interface WishlistProps {
   children: React.ReactNode;
}

const Wishlist: React.FC<WishlistProps> = ({ children }) => {
   const { filteredProducts, bookmarkedIds, toggleBookmark, isLoading } =
      useProducts();
   const [bookmarkedProducts, setBookmarkedProducts] = useState<any[]>([]);

   useEffect(() => {
      const products = filteredProducts.filter((product) =>
         bookmarkedIds.includes(product.id),
      );
      setBookmarkedProducts(products);
   }, [filteredProducts, bookmarkedIds]);

   if (isLoading) {
      return <WishlistSkeleton />;
   }

   return (
      <div>
         <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent>
               <SheetHeader>
                  <SheetTitle>Wishlist</SheetTitle>
               </SheetHeader>
               {bookmarkedProducts.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 mt-6 max-h-[90%] overflow-y-auto">
                     {bookmarkedProducts.map((item, i) => (
                        <Card key={i} className="bg-gray-100 pb-2">
                           <div className="relative bg-white rounded-t-xl">
                              <img
                                 src={item.thumbnail}
                                 alt="product"
                                 className="h-18 w-full rounded-t-lg object-contain"
                              />
                              <div className="flex justify-center items-center absolute bottom-0 right-0">
                                 <Button
                                    variant="ghost"
                                    size="icon"
                                    className="p-1 w-fit h-fit"
                                    onClick={() => toggleBookmark(item)}
                                 >
                                    {bookmarkedIds.includes(item.id) ? (
                                       <BookmarkFilledIcon className="text-black" />
                                    ) : (
                                       <BookmarkIcon className="text-gray-400" />
                                    )}
                                 </Button>
                              </div>
                           </div>
                           <div className="flex flex-col gap-y-1 px-2 mt-2 text-xs">
                              <a
                                 onClick={() =>
                                    (window.location.href = `/detail-product/${item.id}`)
                                 }
                                 className="uppercase hover:underline cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
                              >
                                 {item.title}
                              </a>
                              <div className="font-semibold text-[10px]">
                                 {formatAmount(item.price)}
                              </div>
                           </div>
                        </Card>
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

export default Wishlist;
