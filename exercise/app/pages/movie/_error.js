import { Container } from 'components/container';
import { Button, Card, Elevation, Icon, NumericInput, InputGroup, FormGroup } from "@blueprintjs/core";
import styled from 'styled-components';
import Link from 'next/link';

const ErrorBox = styled.div`
  padding:50px;
  margin-top: 100px;
  text-align: center;
`;
export default () => (
  // 
  <Container>
    <ErrorBox>
      <Card>
        <h1>404</h1>
        <h3>Something went wrong</h3>
        <Link href="/">
          <Button large intent="primary">Back to Home</Button>
        </Link>
      </Card>
    </ErrorBox>
  </Container>
)