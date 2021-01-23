import React from 'react';

const Auth2Context = React.createContext(null);

export const withAuth2 = Component => props => (
  <Auth2Context.Consumer>
    {auth2 => <Component {...props} auth2={auth2} />}
  </Auth2Context.Consumer>
);

export default Auth2Context;