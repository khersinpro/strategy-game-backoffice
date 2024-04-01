'use client'
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import Link from "next/link";


const BreadCrumb = () => {
    const paths: string = usePathname();
    const pathsArray: string[] = paths.split("/").filter((path) => path !== "");

    function formatString(string: string) {
        const formatedString = string.replace(/-/g, " ");
        return formatedString.charAt(0).toUpperCase() + formatedString.slice(1)
      }
    
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathsArray.map((path, index) => {
                    const href = `/${pathsArray.slice(0, index + 1).join("/")}`;
                    const title = formatString(path);
                    const isLast = index === pathsArray.length - 1;
                    return (
                        <BreadcrumbItem key={index}>
                            {isLast ? 
                                <BreadcrumbPage>
                                    {title}
                                </BreadcrumbPage>
                                :
                                <>
                                    <BreadcrumbLink>
                                        <Link href={href}>
                                            {title}
                                        </Link>
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                </>
                            }
               
                        </BreadcrumbItem> 
                    );
                })}

            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadCrumb;