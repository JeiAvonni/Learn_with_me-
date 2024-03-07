// Imports
import 'styled-components';
import { Theme } from '@mui/material/styles';

// Defaulting theme
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}