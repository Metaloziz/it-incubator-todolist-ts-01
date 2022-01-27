import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../../EditableSpan";


export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    args: {
        onChange: action("title change: ")

        // removeTask: action("removeTask"),
        // changeTaskStatus: action("changeTaskStatus"),
        // changeTaskTitle: action("changeTaskTitle"),
    },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    value: "one"
};

export const Secondary = Template.bind({});
Secondary.args = {
    value: "two"
};


export const Large = Template.bind({});
Large.args = {
    value: "three"
};

//
// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Button',
// };
