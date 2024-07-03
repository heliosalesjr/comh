import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "./components/Footer";

export const revalidate = 30; // revalidate at most 30 seconds

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc){
      title,
        smallDescription,
        "currentSlug" : slug.current,
        titleImage
    }`;

    const data = await client.fetch(query);
    return data
}

export default async function Home() {

  const data: simpleBlogCard[] = await getData();
  
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx} className={`${idx === 0 ? 'col-span-1 md:col-span-2 lg:col-span-2' : ''}`}>
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src={urlFor(post.titleImage).url()}
              alt={post.smallDescription}
              layout="fill"
              objectFit="cover"
              className={`${idx === 0 ? 'w-full h-full' : 'rounded-lg'}`}
            />
          </div>

          <CardContent className={`mt-5 ${idx === 0 ? 'md:flex md:justify-between' : ''}`}>
            <div>
              <h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
              <p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
                {post.smallDescription}
              </p>
            </div>
            <Button asChild className="w-full mt-7 md:w-auto md:mt-0">
              <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
      
      
    </div>
    
    </>
  );
}
