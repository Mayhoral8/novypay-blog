import { paginatedPostsQuery } from "@/lib/sanity/queries";
import {useQuery} from "@tanstack/react-query"
import {client} from "@/lib/sanity/sanity"

const usePaginatedPosts = (page = 0, pageSize = 6) => {
  const start = page * pageSize;
  const end = start + pageSize;
  
  return useQuery({
    queryKey: ['posts', 'paginated', page, pageSize],
    queryFn: () => client.fetch(paginatedPostsQuery, { start, end }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
export default usePaginatedPosts