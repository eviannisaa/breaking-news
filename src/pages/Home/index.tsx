import { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import SearchIcon from "../../assets/icon-search.svg";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/context/ProductsContext";
import { formatAmount } from "@/lib/formatAmount";
import Rating from "@/lib/Rating";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const Home = () => {
   const {
      filteredProducts,
      isLoading,
      searchProducts,
      bookmarkedIds,
      setBookmarkedIds,
      toggleBookmark,
   } = useProducts();
   const [searchQuery, setSearchQuery] = useState("");
   const [isSearching, setIsSearching] = useState(false);

   useEffect(() => {
      const storedBookmarks = localStorage.getItem("bookmarkedIds");
      if (storedBookmarks) {
         setBookmarkedIds(JSON.parse(storedBookmarks));
      }
   }, []);

   const handleSearch = () => {
      setIsSearching(true);
      searchProducts(searchQuery);
      setTimeout(() => {
         setIsSearching(false);
      }, 500);
   };

   if (isLoading) {
      return <HomeSkeleton />;
   }

   return (
      <Layout cta={true}>
         <div className="flex flex-col gap-y-5">
            <div className="flex flex-row gap-3 items-center">
               <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
               />
               <Button onClick={handleSearch}>
                  <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
               </Button>
            </div>

            <div>
               {isSearching ? (
                  <div className="border rounded-lg w-full h-60 flex justify-center items-center">
                     <p className="text-center text-sm">Loading...</p>
                  </div>
               ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7">
                     {filteredProducts.map((item, i) => (
                        <Card key={i} className="bg-gray-100 pb-4">
                           <div className="relative bg-white rounded-t-xl">
                              <img
                                 src={item.thumbnail}
                                 alt="product"
                                 className="h-48 w-full rounded-t-lg object-contain"
                              />
                              <div className="flex justify-center items-center w-fit h-6 px-2 rounded-sm absolute top-3 right-3 bg-black">
                                 <p className="font-medium text-xs text-white">
                                    {item.discountPercentage}%
                                 </p>
                              </div>
                              <div className="flex justify-center items-center absolute bottom-2 right-3">
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
                           <div className="flex flex-col px-3 mt-3">
                              <div className="flex justify-between">
                                 <div className="text-[9px] bg-black w-fit text-white px-2 py-0.5 rounded-sm">
                                    {item.category}
                                 </div>
                                 <div className="text-xs font-semibold">
                                    {formatAmount(item.price)}
                                 </div>
                              </div>
                              <Link
                                 to="/detail-product"
                                 onClick={() => {
                                    localStorage.setItem(
                                       "selectedProductId",
                                       item.id.toString(),
                                    );
                                 }}
                                 className="text-sm uppercase mt-2.5 hover:underline cursor-pointer"
                              >
                                 {item.title}
                              </Link>
                              <div className="flex justify-between items-center mt-1">
                                 <p className="text-xs">
                                    {item.stock <= 5 ? (
                                       <span className="text-gray-500">
                                          {item.availabilityStatus}
                                       </span>
                                    ) : (
                                       <>
                                          <span className="text-gray-500">Stock </span>
                                          <span className="font-semibold">
                                             ({item.stock})
                                          </span>
                                       </>
                                    )}
                                 </p>
                                 <div className="flex gap-2 items-center text-xs">
                                    <Rating rating={item.rating} />
                                    <div className="text-[10px] mt-1">{item.rating}</div>
                                 </div>
                              </div>
                           </div>
                        </Card>
                     ))}
                  </div>
               ) : (
                  <div className="border rounded-lg w-full h-60 flex justify-center items-center">
                     <div className="text-center text-sm">Data Not Found</div>
                  </div>
               )}
            </div>
         </div>
      </Layout>
   );
};

export default Home;
