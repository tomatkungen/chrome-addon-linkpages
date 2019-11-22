import { iConfigurePageLink } from "./structure";
import { Utils } from "./utils";

class cCard {
  private cardId: string;

  constructor(private configurePageLink: iConfigurePageLink) {
    this.addDefaultGroup();
    this.cardId = "ons-card";
  }

  private addDefaultGroup() {
    Utils.isObject(this.configurePageLink) &&
      !this.configurePageLink.groupby &&
      (this.configurePageLink.groupby = "any");
  }

  public static cardTemplate(
    id: number,
    title: string,
    link: string,
    subTitle?: string
  ) {
    return `
      <a id="${id}" href="${link}" target="_blank">
        <ons-card class="over">
          <div class="head-title">
            <h2>${title}</h2>
          </div>
          <div class="sub-title">
            <h5>${subTitle}</h5>
          </div>
        </ons-card>
      </a>
    `;
  }

  public getTitle(): string {
    return (this.configurePageLink && this.configurePageLink.title) || "";
  }

  public getLink(): string {
    return (this.configurePageLink && this.configurePageLink.link) || "";
  }

  public getSubTitle(): string {
    return (this.configurePageLink && this.configurePageLink.subTitle) || "";
  }

  public getGroupBy(): string {
    return (this.configurePageLink && this.configurePageLink.groupby) || "";
  }

  public getId(): number {
    return this.configurePageLink.id;
  }

  private saveCard(): boolean {
    return false;
  }
}

export { cCard };
