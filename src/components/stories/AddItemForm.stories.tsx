import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
    // argTypes: {
    //     backgroundColor: {control: 'color'},
    // },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Primary = Template.bind({backgroundColor: {control: 'color'}});
Primary.args = {
    addItem: action("AddItemForm: ")
};

export const Secondary = Template.bind({});
Secondary.args = {
    addItem: action('Second: ')
};


export const Large = Template.bind({});
Large.args = {
    addItem: action('3333: ')
};
//
// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Button',
// };
