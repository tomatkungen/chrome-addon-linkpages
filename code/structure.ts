interface iConfigurePageLink {
  id: number;
  title: string;
  link: string;
  subTitle?: string;
  groupby?: string;
}

interface iSettingCards {
  defaultCardHeight: number;
  defaultCardWidth: number;
  defaultWinHeight: number;
  defaultwinWidth: number;
  defaultCardSpaceWidth: number;
  defaultCardSpaceHeight: number;
}

export { iConfigurePageLink, iSettingCards };
