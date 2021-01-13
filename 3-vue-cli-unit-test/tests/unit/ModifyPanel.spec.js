import { mount } from "@vue/test-utils";
import ModifyPanel from "@/components/ModifyPanel.vue";

describe("ModifyPanel.vue", () => {
  it("emit update:visible event when click cancel btn ", () => {
    const wrapper = mount(ModifyPanel, {
      propsData: {
        visible: true,
      },
    });
    wrapper.get("[data-testid=cancel]").trigger("click");

    expect(wrapper.emitted("update:visible")[0]).toEqual([false]);
    expect(wrapper.emitted("cancel")[0]).toBeTruthy()
  });

  it("emit save event when click cancel btn", () => {
    const item = {
      id: 1,
      username: "小红",
      email: "xiaohong@qq.com",
      gender: "女",
      hobby: ["弹琴", "读书"],
    };

    const wrapper = mount(ModifyPanel, {
      propsData: {
        visible: true,
        item,
      },
    });

    wrapper.get("[data-testid=save]").trigger("click");
    expect(wrapper.emitted("save")[0]).toEqual([item]);
  });
});
