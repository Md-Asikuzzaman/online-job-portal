import { useQuery } from '@tanstack/react-query';

import axios from 'axios';

interface QueryProps {
  queryEndpoint: string;
  queryKey: string;
  postfix: string;
}

const useGetOperation = <T>({
  queryEndpoint,
  queryKey,
  postfix,
}: QueryProps) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axios.get(`${queryEndpoint}`);
      return res.data[postfix] as T;
    },
  });
};

export default useGetOperation;
