import { notification } from 'antd';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { errorMessageSystem } from '../../shared/constants/common';
import { IObject } from '../../shared/utils/constant';

interface UseMutationOptions {
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  bodyType?: 'json' | 'form-data';
}

const useMutation = (apiEndpoint: string, options: UseMutationOptions) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const [error, setError] = useState<IObject>();

  const mutate = useCallback(
    async (body: IObject) => {
      try {
        setLoading(true);
        let bodyData: FormData | string | undefined = undefined;
        if (body && options.bodyType === 'form-data') {
          bodyData = new FormData();
          if (body.file) bodyData.append('file', body.file);
        }

        const headers: IObject = {
          'Accept-Language': 'en',
        };

        if (body && options.bodyType !== 'form-data') {
          bodyData = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(apiEndpoint, {
          method: options.method,
          headers,
          body: bodyData,
        });

        const result = await response.json();
        if (!response.ok) {
          if (result.error_detail?.data) setError(result.error_detail?.data);
          throw new Error(t('common.import_failed'));
        }
        setLoading(false);
        return { ...result, code: response.ok };
      } catch (error) {
        const errorMessageAPI = (error as Error).message;
        const errorDetail =
          errorMessageAPI === errorMessageSystem
            ? t('common.msg.MSG_037')
            : errorMessageAPI;
        setLoading(false);
        notification.error({
          message: 'Error',
          description: errorDetail,
        });
      }
    },
    [apiEndpoint, options.bodyType, options.method, t],
  );

  return { loading, error, mutate };
};

export default useMutation;
