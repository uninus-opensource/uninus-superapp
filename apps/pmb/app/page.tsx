import { Button } from '@uninus/components';
import {
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from 'libs/components/src/atoms/button/enums';
import { NextPage } from 'next';
import { Fragment, ReactElement } from 'react';

const LandingPage: NextPage = (): ReactElement => {
  return (
    <Fragment>
      <Button href="https://litera.uninus.ac.id/uninus/login.jsp">
        LITERA
      </Button>
      <Button variant={BUTTON_VARIANT.ERROR}>Waduh</Button>
    </Fragment>
  );
};

export default LandingPage;
