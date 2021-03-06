import React from 'react';
import styled from 'styled-components';

import {COMPANY_NAME} from '../../constants.js';

const Footer = styled.footer`
  text-align: center;
  padding-bottom: 10px;

  .support {
    margin-bottom: 10px;
  }
`;

const AppFooter = () => (
  <Footer>
    <p className="support">Call 1-800-551-8900 for support.</p>
    <p>{`© ${COMPANY_NAME} ${new Date().getFullYear()}. All Rights Reserved.`}</p>
  </Footer>
);

export default AppFooter;
