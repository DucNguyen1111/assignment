import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { ScreenBreakPoint, ScreenType } from '../constants/common';

export const ScreenDetectionContext = createContext({
  isMobile: false,
  isTablet: false
});

interface ScreenDetectionProps {
  children: ReactNode;
}
/**
 * ONLY CHECKING AT THE FIRST RENDERING
 * use in child-component of the provider:
 * const { isMobile } = useContext(ScreenDetectionContext);
 * isMobile: boolean -> Display on mobile screen
 */
export function ScreenDetectionProvider({ children }: Readonly<ScreenDetectionProps>) {
  const [currentScreenType, setCurrentScreenType] = useState(ScreenType.PC);

  useEffect(() => {
    const detectScreen = () => {
      if (screen.width < ScreenBreakPoint[ScreenType.Tablet]) {
        setCurrentScreenType(ScreenType.Mobile);
        return;
      }
      if (screen.width < ScreenBreakPoint[ScreenType.PC]) {
        setCurrentScreenType(ScreenType.Tablet);
        return;
      }
      setCurrentScreenType(ScreenType.PC);
    };
    window.addEventListener('resize', detectScreen);
    detectScreen();

    return window.removeEventListener('resize', () => {
      //
    });
  }, []);

  const isMobile = useMemo(
    () => currentScreenType === ScreenType.Mobile,
    [currentScreenType]
  );

  const isTablet = useMemo(
    () => currentScreenType === ScreenType.Tablet,
    [currentScreenType]
  );

  const screenDetectionContextValue = useMemo(() => ({ isMobile, isTablet }), [isMobile, isTablet]);

  return (
    <ScreenDetectionContext.Provider value={screenDetectionContextValue}>
      {children}
    </ScreenDetectionContext.Provider>
  );
}
