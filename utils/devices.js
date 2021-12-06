const size = {
  small: '640px',
  medium: '768px',
  large: '1024px',
  extraLarge: '1280px'
};

export const device = {
  small: `(min-width: ${size.small})`,
  medium: `(min-width: ${size.medium})`,
  large: `(min-width: ${size.large})`,
  extraLarge: `(min-width: ${size.extraLarge})`,
  maxSmall: `(max-width: ${size.small})`
};
