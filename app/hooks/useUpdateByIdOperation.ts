import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface QueryProps {
  queryEndpoint: string;
  id: string | undefined;
  mutationKey: string;
  successMsg: string;
  refreshKey: string;
  replacePath: string;
}

const useUpdateByIdOperation = ({
  queryEndpoint,
  id,
  mutationKey,
  successMsg,
  refreshKey,
  replacePath,
}: QueryProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKey, id],
    mutationFn: async (data: any) => {
      if (!id) throw new Error('ID is required');
      const res = await axios.patch(`${queryEndpoint}/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      toast.success(successMsg);
      queryClient.invalidateQueries({
        queryKey: [refreshKey],
      });

      router.replace(replacePath);
    },

    onError: () => {
      toast.error('Something went wrong!');
    },
  });
};

export default useUpdateByIdOperation;
