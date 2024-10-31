import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}

export { Skeleton };

export const LayoutSkeleton = ({
  children,
}: {
  children: React.ReactNode;
  form?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center fixed w-full px-8 pt-10 pb-6 z-10 bg-white">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-8 w-[250px]" />
      </div>
      <div className="px-8">
        <div className="pb-4 pt-32">{children}</div>
      </div>
    </div>
  );
};

export const HomeSkeleton = () => {
  return (
    <LayoutSkeleton>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Skeleton className="h-8 w-4/5" />
          <Skeleton className="h-8 w-1/5" />
        </div>
        <div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-5 gap-y-7">
            {Array.from({ length: 10 })?.map((_, index) => {
              return (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutSkeleton>
  );
};

export const DetailSkeleton = () => {
  return (
    <LayoutSkeleton>
      <div className="w-3/4 m-auto">
        <div className="grid grid-cols-2 justify-between p-6">
          <Skeleton className="h-full w-full" />
          <div className="flex flex-col gap-y-4 p-6">
            {Array.from({ length: 6 })?.map((_, index) => (
              <Skeleton key={index} className="h-8 w-full" />
            ))}
          </div>
        </div>
        <div className="p-6">
          <hr />
          <div className="my-8">
            <Skeleton className="h-8 w-1/3" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-sm">
            {Array.from({ length: 10 })?.map((_, index) => {
              return (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutSkeleton>
  );
};

export const WishlistSkeleton = () => {
  return (
    <LayoutSkeleton>
      <div>
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-6 max-h-[90%] overflow-y-auto">
        {Array.from({ length: 10 })?.map((_, index) => {
          return (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          );
        })}
      </div>
    </LayoutSkeleton>
  );
};
