import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from "../../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../../Task";


export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        removeTask: action("removeTask"),
        changeTaskStatus: action("changeTaskStatus"),
        changeTaskTitle: action("changeTaskTitle"),
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    todolistId: "1",
    task: {id: "1", title: "title", isDone: true}
};

export const Secondary = Template.bind({});
Secondary.args = {
    todolistId: "1",
    task: {id: "2", title: "title2", isDone: false}
};


export const Large = Template.bind({});
Large.args = {
    todolistId: "1",
    task: {id: "2", title: "title2", isDone: false}
};

//
// export const Small = Template.bind({});
// Small.args = {
//     size: 'small',
//     label: 'Button',
// };
