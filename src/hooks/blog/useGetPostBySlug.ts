import { postQuery } from "@/lib/sanity/queries";
import {useQuery} from "@tanstack/react-query"
import {client} from "@/lib/sanity/sanity"

const useGetPostBySlug = (slug: string | string[] | undefined) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => client.fetch(postQuery, { slug }),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
export default useGetPostBySlug