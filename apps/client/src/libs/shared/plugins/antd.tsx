import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { type PropsWithChildren, useState } from 'react';

/**
 * Fix issue the antd's css is not loaded immediately on SSR
 */
export default function AntdStyleProvider({ children }: Readonly<PropsWithChildren>) {

  return <StyleProvider >{children}</StyleProvider>;
}
