'use client'; // Ensure this component is rendered on the client-side

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import Header from './Header';
import clsxm from '../../shared/lib/clsxm';
import { HEADER_KEY, HEADER_KEY_TYPE } from '../../shared/constants/common';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { normalizePath } from '../../shared/helpers/common';

const AntdStyleProvider = dynamic(() => import('../../shared/plugins/antd'), {
  ssr: false, // Ensures this component is only rendered on the client-side
});

interface LayoutProps {
  children: ReactNode;
  mainClassName?: string;
}

function textLink(pathname: string, link: string) {
  if (normalizePath(pathname) === normalizePath(link))
    return 'font-bold text-[#1677ff]';
  return '';
}

export default function Layout({
  children,
  mainClassName,
}: Readonly<LayoutProps>) {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = pathname.split('/')[1] || 'en';

  // Adjust link based on locale
  const getLocalizedLink = (link: string) => `/${locale}${link}`;

  return (
    <AntdStyleProvider>
      <div className="relative flex min-h-[100vh] flex-col">
        <div className="layout-wrapper">
          <Header />
          <div className="flex flex-row">
            <div className="flex min-h-[calc(100vh-70px)] flex-[0_0_250px] flex-col border-r-[1px] border-[#ced4da] p-4">
              {HEADER_KEY.filter(
                (item) => item.type !== HEADER_KEY_TYPE.PC && item.isShow
              ).map(({ label, link }) => (
                <Link
                  href={getLocalizedLink(link)} // Use localized link
                  key={label}
                  className={`mb-5 whitespace-nowrap ${textLink(
                    pathname,
                    getLocalizedLink(link)
                  )}`}
                >
                  {t(label)}
                </Link>
              ))}
            </div>
            <main
              className={clsxm(
                mainClassName,
                'w-full overflow-hidden bg-[#ffffff]'
              )}
            >
              {children}
            </main>
          </div>
        </div>
      </div>
    </AntdStyleProvider>
  );
}
