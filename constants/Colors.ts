/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

// const tintColorLight = '#0a7ea4';
// const tintColorDark = '#fff';

const tintColorLight = '#2f95dc';
const tintColorDark = '#f0f';

export const Azul = "#130a8f";
export const Amarelo = "#f0b429";

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  blue: {
    background: '#130a8f',
  },
  yellow: {
    background: '#f0b429',
  }
};

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
