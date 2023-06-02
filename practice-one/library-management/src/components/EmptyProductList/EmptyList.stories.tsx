import { type StoryFn, type Meta } from "@storybook/react";
import EmptyProductList from "./index";

export default {
  title: "Example/EmptyProductList",
  component: EmptyProductList,
} as Meta<typeof EmptyProductList>;

const Template: StoryFn<typeof EmptyProductList> = (args) => (
  <EmptyProductList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  errorMessage: "We couldn't find any books at the moment",
};