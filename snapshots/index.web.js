/* globals document */
import { AppRegistry } from 'react-native';
import fructose from '@times-components/fructose';
import { loadStories } from './components';

AppRegistry.registerComponent('snapper', () => fructose(loadStories));
AppRegistry.runApplication('snapper', {
  rootTag: document.getElementById('react-root')
});
