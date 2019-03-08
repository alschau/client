import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profile from "../../info/Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class ProfileRouter extends React.Component {
  render() {
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/:id` }
          render={() => <Profile />}
        />

        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/1`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default ProfileRouter;