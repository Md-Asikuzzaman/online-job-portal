import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface MutationProps {
  queryEndpoint: string;
  mutationKey: string;
  successMsg: string;
  refreshKey: string;
  replacePath: string;
}

const useCreateOperation = ({
  queryEndpoint,
  mutationKey,
  successMsg,
  refreshKey,
  replacePath,
}: MutationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (data: any) => {
      const res = await axios.post(`${queryEndpoint}`, data);
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

export default useCreateOperation;
