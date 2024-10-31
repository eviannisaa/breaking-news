import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/ui/layout";
import { useProducts } from "@/context/ProductsContext";
import Rating from "../../lib/Rating";
import { formatAmount } from "@/lib/formatAmount";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { DetailSkeleton } from "@/components/ui/skeleton";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";

const DetailProduct = () => {
   const {
      products,
      isLoading,
      bookmarkedIds,
      setBookmarkedIds,
      toggleBookmark,
   } = useProducts();
   const id = localStorage.getItem("selectedProductId");
   const product = products.find((item) => item.id === Number(id));
   const isBookmarked = bookmarkedIds.includes(product?.id!);

   useEffect(() => {
      const storedBookmarkedIds = localStorage.getItem("bookmarkedIds");
      if (storedBookmarkedIds) {
         setBookmarkedIds(JSON.parse(storedBookmarkedIds));
      }
   }, []);

   if (isLoading) {
      return <DetailSkeleton />;
   }

   const menus = [
      {
         label: "Detail Product",
         active: true,
      },
   ];

   return (
      <Layout submenus={menus}>
         <Card className="w-3/4 m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center">
               {product?.images.length! > 1 ? (
                  <Carousel className="w-full max-w-xs m-auto">
                     <CarouselContent>
                        {product?.images.map((img: any, index: any) => (
                           <CarouselItem key={index}>
                              <div className="p-1">
                                 <img
                                    src={img}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full object-contain h-96"
                                 />
                              </div>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                     <CarouselPrevious />
                     <CarouselNext />
                  </Carousel>
               ) : (
                  <img
                     src={product?.images[0]}
                     alt="product"
                     className="w-full object-contain h-96"
                  />
               )}

               <div className="flex flex-col gap-y-3 p-6 mt-3">
                  <p className="text-4xl font-medium capitalize">{product?.title}</p>
                  <div className="flex justify-between">
                     <div className="flex gap-2 items-center text-sm">
                        <Rating rating={product?.rating!} />
                        <div className="text-[12px] mt-1">{product?.rating}</div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 font-medium text-xs text-black">
                     <div className="w-full h-fit py-1 px-2 rounded capitalize text-center overflow-hidden whitespace-normal break-words bg-gray-300">
                        #{product?.category}
                     </div>
                     <div className="w-full h-fit py-1 px-2 rounded text-center overflow-hidden whitespace-normal break-words bg-gray-300">
                        #{product?.brand}
                     </div>
                     <div className="w-full h-fit py-1 px-2 rounded text-center overflow-hidden whitespace-normal break-words bg-gray-300">
                        {product?.sku}
                     </div>
                  </div>

                  <p className="text-sm my-3 text-gray-800">{product?.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
                     <div className="w-full h-fit text-center py-2 font-medium text-sm text-gray-800 rounded-full bg-gray-200">
                        {formatAmount(product?.price!)}
                     </div>
                     <div>
                        <p className="text-xs">Discount</p>
                        <div className="text-center w-full py-0.5 mt-1.5 text-gray-100 bg-black rounded-full">
                           <span className="font-bold text-lg">
                              {product?.discountPercentage}
                           </span>
                           &nbsp;
                           <span className="text-gray-400">%</span>
                        </div>
                     </div>

                     <div>
                        <p className="text-xs">Available Stock</p>
                        <div className="text-center h-fit w-full py-0.5 mt-1.5 text-gray-200 bg-black rounded-full">
                           <span className="font-bold text-lg">{product?.stock}</span>
                           &nbsp;&nbsp;
                           <span className="text-gray-400 text-xs">
                              {product?.availabilityStatus}
                           </span>
                        </div>
                     </div>
                  </div>

                  <Button
                     className="mt-6"
                     onClick={() => toggleBookmark(product!)}
                     disabled={isBookmarked}
                  >
                     {bookmarkedIds.includes(product?.id!)
                        ? "Add to Wishlist"
                        : "Add to Wishlist"}
                  </Button>
               </div>
            </div>

            <div className="p-6">
               <hr />
               <div className="font-semibold text-xl my-8 flex items-center gap-1">
                  <h1>Reviews</h1>
                  <span className="text-gray-400 font-medium text-sm mt-0.5">
                     ({product?.reviews.length})
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
                  {product?.reviews.map((item, i) => {
                     const options: Intl.DateTimeFormatOptions = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                     };
                     const formattedDate: string = new Date(
                        item.date,
                     ).toLocaleDateString("en-US", options);

                     return (
                        <div
                           key={i}
                           className="border p-4 rounded-lg overflow-hidden whitespace-normal break-words"
                        >
                           <p className="font-semibold">{item.reviewerName}</p>
                           <p className="text-xs mt-1 text-gray-500">
                              {item.reviewerEmail}
                           </p>
                           <p className="my-4">"{item.comment}"</p>
                           <div className="flex justify-between text-xs text-gray-500">
                              <div>{formattedDate}</div>
                              <Rating rating={item.rating} />
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </Card>
      </Layout>
   );
};

export default DetailProduct;
