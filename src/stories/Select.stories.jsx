import React from "react";
import Select from "../components/Select/Select";


export default {
    title: "Forms/Select",
    component: Select,
    argTypes: {}
};

const Template = (args) => <Select {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    items: ["toto"]
}