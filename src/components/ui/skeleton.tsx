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
        <Skeleton className="h-8 w-[180px]" />
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
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-[50px]" />
        </div>
        <div>
          <div className="flex flex-wrap gap-y-3 justify-between">
            {Array.from({ length: 6 })?.map((_, index) => {
              return (
                <div
                  key={index}
                  style={{
                    width: index % 5 === 0 ? "46%" : "25%",
                  }}
                >
                  <div className="flex flex-col gap-y-4 border border-gray-400 p-3 h-full rounded-xl">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between font-normal text-xs">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutSkeleton>
  );
};
