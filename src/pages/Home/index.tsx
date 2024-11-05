import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { HomeSkeleton } from "@/components/ui/skeleton";
import { useNews } from "@/context/NewsContext";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Home = () => {
   const {
      news,
      isLoading,
      searchQuery,
      setSearchQuery,
      isSearching,
      handleSearch,
      handleReset,
      toggleBookmark,
      formatDate,
   } = useNews();

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
                  handleReset={handleReset}
                  reset={searchQuery ? true : false}
               />
               <Button onClick={() => handleSearch(searchQuery)}>
                  <MagnifyingGlassIcon />
               </Button>
            </div>

            <div>
               {isSearching ? (
                  <div className="border rounded-lg w-full h-60 flex justify-center items-center">
                     <p className="text-center text-sm">Loading...</p>
                  </div>
               ) : news.length > 0 ? (
                  <div className="flex flex-wrap gap-y-3 justify-between">
                     {news.slice(0, 6).map((item, index) => {
                        return (
                           <div
                              key={index}
                              style={{
                                 width: index % 5 === 0 ? "46%" : "26%",
                              }}
                           >
                              <Card className="flex flex-col gap-y-4 border border-gray-400 p-3 h-full w-full">
                                 {item.urlToImage && (
                                    <img
                                       src={item.urlToImage}
                                       alt="news img"
                                       className="rounded-sm h-80 object-cover"
                                    />
                                 )}
                                 <div className="flex flex-col gap-y-1 text-xs text-gray-500 ">
                                    <p>
                                       Author :{" "}
                                       <span className="text-black">{item.author}</span>
                                    </p>
                                    <p>Published : {formatDate(item.publishedAt)}</p>
                                 </div>
                                 <p className="text-gray-900 font-semibold text-xs line-clamp-2">
                                    {item.title}
                                 </p>
                                 <p className="font-normal text-xs text-gray-900 line-clamp-2">
                                    {item.description}
                                 </p>
                                 <p className="text-gray-900 font-normal text-xs line-clamp-2">
                                    {item.content}
                                 </p>
                                 <div className="flex justify-between font-normal text-xs">
                                    <div className="flex items-center">
                                       <p className="text-gray-600">Source : </p>
                                       &nbsp;
                                       <p className="font-medium">{item.source.name}</p>
                                    </div>
                                    <a
                                       href={item.url}
                                       target="_blank"
                                       onClick={() => toggleBookmark(item)}
                                       className="underline text-blue-800 font-medium"
                                    >
                                       Read More
                                    </a>
                                 </div>
                              </Card>
                           </div>
                        );
                     })}
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
