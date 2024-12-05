import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface QueryProps {
  queryEndpoint: string;
  id: string | undefined;
  queryKey: string;
  postfix: string;
}

const useGetByIdOperation = <T>({
  queryEndpoint,
  id,
  queryKey,
  postfix,
}: QueryProps) => {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: async () => {
      if (!id) throw new Error('ID is required');
      const res = await axios.get(`${queryEndpoint}/${id}`);
      return res.data[postfix] as T;
    },
    enabled: !!id,
  });
};

export default useGetByIdOperation;
