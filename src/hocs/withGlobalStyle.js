import 'react';
import { injectGlobal } from 'styled-components';
import { bgColor, textColor } from '../vars';

injectGlobal`
* {
  margin: 0;
  padding: 0;
  outline: none;
}


*, *::before, *::after {
  box-sizing: inherit;
}
.mapboxgl-ctrl-bottom-right {
  display:none;
}
html,body {
  background: ${bgColor};
  font-family:'Helvetica',sans-serif;
  color: ${textColor};
  font-size: 16px;
  line-height: 1.5;
  overflow:hidden;
}

h1,h2{
  font-family: 'Helvetica';
  text-transform: uppercase;
}
  
h3,h4 {
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Helvetica',sans-serif;  

}

input {
  border: none
}



`;

export default Component => Component;
