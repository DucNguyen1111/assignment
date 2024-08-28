import { NextRouter, useRouter } from "next/router";
import storageService from "../../shared/helpers/storage";
import { UrlLogin } from "../../shared/constants/common";

const PrivateRoute = (
    Component: () => JSX.Element,
    validatePermission: (router: NextRouter) => void
) => {
    const AuthenticatedComponent = () => {
        const router = useRouter();
        if (typeof window !== 'undefined') {
            validatePermission(router);
        }

        return <Component />;
    };
    return AuthenticatedComponent;
};

export const Authenticated = (Component: () => JSX.Element) => {
    return PrivateRoute(Component, (router) => {
        if (!storageService.isAuthenticated) {
            router.push(UrlLogin);
        }
    });
};

export const PublicRoute = (Component: () => JSX.Element) => {
    const UnauthenticatedComponent = () => {
      const router = useRouter();
      if (typeof window !== 'undefined' && storageService.isAuthenticated) router.push('/');
      return <Component />;
    };
    return UnauthenticatedComponent;
  };
  