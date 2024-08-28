'use client'
import { notification } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { errorMessageSystem } from '../../shared/constants/common';
import { IObject } from '../../shared/utils/constant';

const useFetch = (apiEndpoint: string, query: object = {}) => {
  const [data, setData] = useState<IObject>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const t = useTranslations();
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  };

  if (query) {
    apiEndpoint += new URLSearchParams({ ...query });
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, { headers });
      const result = await response.json();
      if (!response.ok) {
        const errorMessage = t('common.error_system');
        throw new Error(errorMessage as string);
      }

      setData(result.data);
      setTotal(result.data.length);
    } catch (error) {
      const errorMessageAPI = (error as Error).message;
      const errorDetail =
        errorMessageAPI === errorMessageSystem
          ? t('common.msg.MSG_037')
          : errorMessageAPI;
      setLoading(false);
      setError(errorDetail);
      notification.error({
        message: 'Error',
        description: errorDetail,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  return { data, loading, total, error, fetchData };
};

export default useFetch;
