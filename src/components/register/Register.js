import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import "./Register.css"

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
  height: 500px;
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

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      username: null,
      password: null,
      valpassword: null,
      validate: true,
      exist: false,
      userList: null
    };
  }
  /**
   * HTTP POST request is sent to the backend.
   * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
   */
  register() {
    const usernameList = this.state.userList.map(p => p.username);
    if (usernameList.includes(this.state.username)) {
      this.setState({exist: true});
      this.props.history.push(`/register`);
    }
    else if(this.state.password !== this.state.valpassword){
      this.setState({validate: false});
      this.setState({password: null});
      this.setState({valpassword: null});
      this.props.history.push(`/register`);
    }
    else {
      this.props.history.push(`/login`);
      fetch(`${getDomain()}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password,

        })

      })

        .then(response => response.json())
          .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
              alert("The server cannot be reached. Did you start it?");
            } else {
              alert(`Something went wrong during the login: ${err.message}`);
            }
          });

    }
  }

  return(){
    this.props.history.push(`/login`)
  }

  /**
   *  Every time the user enters something in the input field, the state gets updated.
   * @param key (the key of the state for identifying the field that needs to be updated)
   * @param value (the value that gets assigned to the identified state key)
   */
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(users => {
        this.setState({ userList: users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });
  }

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            {!this.state.validate ? (
            <p className="PasswordWarningMessage">
              Passwords need to match!
            </p>
          ) :null}

            {this.state.exist ? (
              <p className="UsernameWarningMessage">
                Username not available!
              </p>
            ) :null}

            <Label>Name</Label>
            <InputField
                placeholder="Enter here.."
                onChange={e => {
                  this.handleInputChange("name", e.target.value);
                }}
            />
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
                type = "password"
                onChange={e => {
                  this.handleInputChange("password", e.target.value);
                }}
            />
            <Label>Validate password</Label>
            <InputField
                placeholder="Enter here.."
                type = "password"
                onChange={e => {
                  this.handleInputChange("valpassword", e.target.value);
                }}
            />
            <ButtonContainer>

              <Button
                  disabled={!this.state.name || !this.state.username ||
                            !this.state.password || !this.state.valpassword
                  }
                  width ="40%"
                  onClick={() => {
                    this.register();
                  }}
              >
                Register
              </Button>

              <Button
                width ="40%"
                onClick={() => {
                  this.return();
                }}
              >
                Return
              </Button>

            </ButtonContainer>
          </Form>
        </FormContainer>
      </BaseContainer>
    );
  }
}

export default withRouter(Register);
