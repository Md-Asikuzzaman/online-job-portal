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
  errorMsg?: string;
}

const useDeleteByIdOperation = ({
  queryEndpoint,
  mutationKey,
  successMsg,
  refreshKey,
  replacePath,
  errorMsg,
}: MutationProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [mutationKey],
    mutationFn: async (id: string) => {
      if (!id) throw new Error('ID is required');
      await axios.delete(`${queryEndpoint}/${id}`);
    },

    onSuccess: () => {
      toast.success(successMsg);
      queryClient.invalidateQueries({
        queryKey: [refreshKey],
      });

      router.replace(replacePath);
    },

    onError: () => {
      toast.error(errorMsg || 'Something Went Wrong!');
    },
  });
};

export default useDeleteByIdOperation;
