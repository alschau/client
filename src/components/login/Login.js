import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";
import "./Login.css"

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// ############################################################################################################
class Login extends React.Component {
  /**
   * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
   * The constructor for a React component is called before it is mounted (rendered).
   * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
   * These fields are then handled in the onChange() methods in the resp. InputFields
   */
  constructor() {
    super();
    this.state = {
      token: null,
      username: null,
      password: null,
      newToken: null,
      userList: null,
      notFound: false,
      tokenatindex: null
    };
  }


// ##################################################################
  login() {

    fetch(`${getDomain()}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(res => {
        if (res.error) {
          alert(res.message);
          this.props.history.push('/login')
        } else {
          console.log(res);
          const user = new User(res);
          console.log(user);
          localStorage.setItem("token", user.token);
          localStorage.setItem("user_id", user.id);
          this.props.history.push('/login')
        }
      })
      .catch(err => {
        if (err.message.match(/Failed to fetch/)) {
          alert("The server cannot be reached. Did you start it?");
        } else {
          alert(`Something went wrong during the login: ${err.message}`);
        }
      });
  }

  // ##################################################################
  register() {
    this.props.history.push(`/register`);
  }

  // ##################################################################
  handleInputChange(key, value) {
    this.setState({[key]: value});
  }

  // ##################################################################
  componentDidMount() {

    fetch(`${getDomain()}/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(users => {
        this.setState({userList: users});
        //console.log(this.setState({ userList: users }));
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  // ############################################################################################################
  render() {
    const style = {
      display: this.state.notFound ? '' : 'none',
      color: '#990000'
    };
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>LOGIN</Label>

            {this.state.notFound ? (
              <p className="LoginWarning">
                Wrong Username or Password!
              </p>
            ) : null}

            <Label>Username</Label>
            <InputField
              placeholder="Enter here.."
              onChange={e => {
                this.handleInputChange("username", e.target.value);
              }}
            />
            <Label>Password</Label>
            <InputField
              placeholder="Enter here.."
              type="password"
              onChange={e => {
                this.handleInputChange("password", e.target.value);
              }}
            />
            <ButtonContainer>
              <Button
                disabled={!this.state.username || !this.state.password}
                width="40%"
                onClick={() => {
                  this.login();
                }}
              >
                Login
              </Button>

              <Button
                width="40%"
                onClick={() => {
                  this.register();
                }}
              >
                Register
              </Button>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
