import React from "react";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
} from "./breadcrumb";
import { Toaster } from "./toaster";
import { Button } from "./button";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import LastActivity from "@/pages/LastActivity";

interface LayoutProps {
   cta?: boolean;
   submenu?: string;
   children: React.ReactNode;
   submenus?: { label: string; active: boolean; to?: string }[];
}

const Layout: React.FC<LayoutProps> = ({ submenus, children }) => {
   return (
      <div className="w-full">
         <div className="flex flex-row justify-between md:items-center gap-y-4 fixed w-full px-8 pt-10 pb-6 z-10 bg-white">
            <Breadcrumb>
               <BreadcrumbList>
                  <BreadcrumbItem>
                     <BreadcrumbLink href="/">
                        <p className="font-bold text-2xl text-black">Breaking News</p>
                     </BreadcrumbLink>
                  </BreadcrumbItem>
                  {submenus?.map((menu, index) => (
                     <React.Fragment key={index}>
                        <BreadcrumbSeparator
                           key={`separator-${index}`}
                           className={menu.active ? "text-black" : ""}
                        />
                        <BreadcrumbItem>
                           <BreadcrumbLink href={menu.to ?? ""}>
                              <p className={menu.active ? "text-black" : ""}>
                                 {menu.label}
                              </p>
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                     </React.Fragment>
                  ))}
               </BreadcrumbList>
            </Breadcrumb>
            <LastActivity>
               <Button>
                  <ActivityLogIcon />
                  <span className="hidden md:block">Last Activity</span>
               </Button>
            </LastActivity>
         </div>
         <div className="px-8">
            <div className="pb-4 pt-32">{children}</div>
            <Toaster />
         </div>
      </div>
   );
};

export default Layout;
