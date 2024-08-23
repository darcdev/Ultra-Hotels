import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { provideIcons } from '@ng-icons/core';
import { materialUIIcons } from '@/app/presenter/icons/providerIcons';

export default {
  title: 'Components/Icon',
  component: IconComponent,
  decorators: [
    moduleMetadata({
      providers: [provideIcons({ ...materialUIIcons })],
    }),
  ],
  argTypes: {
    name: {
      control: 'text',
      description: 'Nombre del icono',
    },
    color: {
      control: 'color',
      description: 'Color del icono',
    },
    size: {
      control: {
        type: 'select',
        options: ['1rem', '1.5rem', '2rem', '3rem'],
      },
      description: 'Tamaño del icono',
    },
  },
} as Meta;

const Template: StoryFn<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  name: 'matEdgesensorHighRound',
  color: 'currentColor',
  size: '1.5rem',
};

export const Large = Template.bind({});
Large.args = {
  name: 'matEditNotificationsRound',
  color: 'currentColor',
  size: '3rem',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  name: 'mat18UpRatingRound',
  color: '#FF5733',
  size: '2rem',
};
