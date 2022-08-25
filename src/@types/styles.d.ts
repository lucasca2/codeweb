import "styled-components";
import { defaultTheme } from "../styles/themes/default";

declare module "styled-components" {
  type ThemeType = typeof defaultTheme;
  type ThemeColors = typeof defaultTheme.colors;
  type ThemeFontSizes = typeof defaultTheme.fontSizes;
  type ThemeFonts = typeof defaultTheme.fonts;
  type ThemeButtonSizes = typeof defaultTheme.buttonSizes;
  type ThemeSpacing = typeof defaultTheme.spacing;

  export type ColorScheme = keyof ThemeColors;
  export type FontSizesScheme = keyof ThemeFontSizes;
  export type FontsScheme = keyof ThemeFonts;
  export type ButtonSizesScheme = keyof ThemeButtonSizes;
  export type SpacingScheme = keyof ThemeSpacing;

  export interface DefaultTheme extends ThemeType {}
}
