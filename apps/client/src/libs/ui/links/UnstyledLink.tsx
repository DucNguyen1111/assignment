import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import clsxm from '../../shared/lib/clsxm';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithRef<'a'>;

// eslint-disable-next-line react/display-name
const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, href, openNewTab, className, nextLinkProps, ...rest }, ref) => {
    const isNewTab =
      (openNewTab ?? false) &&
      href &&
      !href.startsWith('/') &&
      !href.startsWith('#');
    if (!isNewTab) {
      return (
        <Link
          href={href}
          ref={ref}
          className={className}
          {...rest}
          {...nextLinkProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
        className={clsxm('cursor-pointer', className)}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
