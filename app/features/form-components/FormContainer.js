import React from 'react';
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import styled from 'styled-components';
import P from 'prop-types';

const DimmableWrapper = styled(Dimmer.Dimmable)`
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: solid 1px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #fff;
`;

const FormContainer = ({children, loading, ...props}) => (
  <DimmableWrapper as={Container} dimmed={loading} {...props}>
    {children}
    <Dimmer active={loading} inverted>
      <Loader>Loading...</Loader>
    </Dimmer>
  </DimmableWrapper>
  );

FormContainer.propTypes = {
  children: P.element.isRequired,
  loading: P.bool,
};

export default FormContainer;
