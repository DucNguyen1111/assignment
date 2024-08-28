'use client'
import { Image, Typography } from 'antd';
import { useTranslations } from 'next-intl';
import useFetch from '../../common/hooks/useFetch';
import { urlImage } from '../../shared/constants/common';

export default function ListImagePage() {
  const t = useTranslations();
  const { Title } = Typography;
  const { data, total } = useFetch(urlImage);

  return (
    <div className="w-full p-4">
      <Title level={3}>{t('common.list_image')}</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data ? (
          data.map((image: string, index: number) => (
            <Image
              key={index}
              width={200}
              src={image}
              alt={`Image ${index + 1}`}
              className="object-cover"
            />
          ))
        ) : (
          <p>{t('common.no_images')}</p>
        )}
      </div>
      {total && <p className="mt-5">{t('common.showing_images', { total })}</p>}
    </div>
  );
}
