export const mainTheme = {
  colors: {
    mainColor: '#334e61',
    secondaryTextColor: '#f3f4f5',
    blackColor: '#1b1c1d',
    redColor: '#db2828',
    blueColor: '#2185d0',
    greenColor: '#21ba45',
    greyColor: '#767676',
    orangeColor: '#f2711c',
    tealColor: '#009c95',
    purpleColor: '#a333c8',
    brownColor: '#a5673f',
    violetColor: '#6435c9',
    pinkColor: '#e03997',
    noteTitleHoverColor: '#f3f4f5',
    noteAddIconBorderColor: 'rgba(34, 36, 38, .15)',
    noteFormInfoColor: 'rgba(0, 0, 0, .3)',
    menuHoverColor: 'rgba(0, 0, 0, .03)',
  },
  base: {
    marginRem: 1, // rem
    paddingRem: 1, // rem
    borderRadiusPx: 3, // px
  },
  drawer: {
    widthRem: 22,
  },
  note: {
    marginRem: .5, // rem
    containerWidthRem: 18.9, // rem
    containerFullWidthRem: 54.7, // rem
    titleHeightRem: 2, // rem
    addIconWidthRem: 3.5, // rem
    addIconFontSizeRem: 1.5, // rem
    addIconBorder: () => `1px solid ${mainTheme.colors.noteAddIconBorderColor}`,
    addIconBoxShadow: () => `0 1px 2px 0 ${mainTheme.colors.noteAddIconBorderColor}`,
  },
  modal: {
    checkboxWidthRem: 1.5, // rem
    containerWidthRem: 50, // rem
    limitedHeightRem: 7, // rem
  },
  categories: {
    menuHeightRem: 3.5, // rem
    menuDeleteIconWidthRem: 2, // rem
    menuBorder: () => `.5px solid ${mainTheme.colors.noteAddIconBorderColor}`,
    menuBoxShadow: () => `0 0 1px 0 ${mainTheme.colors.noteAddIconBorderColor}`
  },
  media: {
    mobileMaxWidthPx: 768,
  },
};
