import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MyNavbar from '../../components/myNavbar';

export default {
  title: 'Components/MyNavbar',
  component: MyNavbar,
  decorators: [(Story) => <Router><Story /></Router>], // Wrap the story with Router
} as Meta;

// Template for the story
const Template: StoryFn<{}> = () => <MyNavbar />;

// Story for the default MyNavbar
export const Default: StoryFn<{}> = Template.bind({});

// Story with different content
export const CustomContent: StoryFn<{}> = () => (
    <MyNavbar>
      <div className="mx-auto px-4 sm:px-2 md:px-2 lg:px-6 ">
        <div className="flex items-center justify-between h-10">
          <p className="text-white">Custom Content</p>
        </div>
      </div>
    </MyNavbar>
  );
  

// Story with different link
export const DifferentLink: StoryFn<{}> = () => (
  <MyNavbar>
    <div className="mx-auto px-4 sm:px-2 md:px-2 lg:px-6 ">
      <div className="flex items-center justify-between h-10">
        <Link to="/dashboard" className="flex text-white items-center justify-between h-10">
          Dashboard
        </Link>
      </div>
    </div>
  </MyNavbar>
);
