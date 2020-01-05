import { iPageLinkItem } from "./interface/ipagelink";
import { aPageLinkItem } from "./abstract/apagelinkitem";

class cCard extends aPageLinkItem {

    constructor(pageLinkItem: iPageLinkItem) {
        super(pageLinkItem);
    }

    public template() {
        return `
            <a id="${super.getId()}" href="${super.getLink()}" target="_blank">
                <ons-card class="over">
                    <div class="head-title">
                        <h2>${super.getTitle()}</h2>
                    </div>
                    <div class="sub-title">
                        <h5>${super.getSubTitle()}</h5>
                    </div>
                </ons-card>
            </a>
        `;
    }
}

export { cCard };
