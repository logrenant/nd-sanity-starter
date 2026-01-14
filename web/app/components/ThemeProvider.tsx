import {createContext, useContext, useMemo, useEffect} from 'react';
import type {SanitySettings} from '~/lib/sanity-types';

type ThemeContextType = {
  settings: SanitySettings | null | undefined;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({
  children,
  settings,
  nonce,
}: {
  children: React.ReactNode;
  settings: SanitySettings | null | undefined;
  nonce?: string;
}) {
  const fontStyles = useMemo(() => {
    if (!settings?.fonts || settings.fonts.length === 0) {
      console.warn('ThemeProvider: No fonts found in settings');
      return '';
    }

    console.log('ThemeProvider: Processing fonts', settings.fonts);

    const fontFaceRules = settings.fonts.flatMap((font) => 
      font.weights.map((weight) => {
        const fontUrl = weight.file?.asset?.url;
        if (!fontUrl) {
          console.warn(`ThemeProvider: Missing URL for font ${font.name} weight ${weight.weight}`);
          return '';
        }
        
        // Determine font format from extension or URL
        const extension = weight.file?.asset?.extension || 
                         fontUrl.split('.').pop()?.toLowerCase();
        
        let format = 'woff2';
        if (extension === 'ttf') format = 'truetype';
        else if (extension === 'otf') format = 'opentype';
        else if (extension === 'woff') format = 'woff';
        else if (extension === 'woff2') format = 'woff2';
        
        return `
        @font-face {
          font-family: '${font.name}';
          font-style: ${weight.style};
          font-weight: ${weight.weight};
          src: url('${fontUrl}') format('${format}');
          font-display: swap;
        }
      `;
      })
    ).filter(Boolean).join('\n');

    const cssVariables = settings.fonts.map((font) => {
      // Font adında boşluk varsa çift tırnak ekle, yoksa tırnaksız
      const fontName = font.name.includes(' ') ? `"${font.name}"` : font.name;
      return `--${font.variableName}: ${fontName};`;
    });

    // Eğer font-primary tanımlı değilse, ilk fontu font-primary olarak ata
    const hasFontPrimary = settings.fonts.some(f => f.variableName === 'font-primary');
    if (!hasFontPrimary && settings.fonts.length > 0) {
      const primaryFont = settings.fonts[0];
      const fontName = primaryFont.name.includes(' ') ? `"${primaryFont.name}"` : primaryFont.name;
      cssVariables.push(`--font-primary: ${fontName};`);
    }

    return `
      ${fontFaceRules}
      
      :root {
        ${cssVariables.join('\n    ')}
      }
    `;
  }, [settings]);

  return (
    <ThemeContext.Provider value={{settings}}>
      {fontStyles && (
        <style dangerouslySetInnerHTML={{__html: fontStyles}} nonce={nonce} />
      )}
      {children}
    </ThemeContext.Provider>
  );
}
