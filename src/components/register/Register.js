import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
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
// ############################################################################################################

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
// ##################################################################
  register() {
    if(this.state.password !== this.state.valpassword){
      this.setState({validate: false});
      this.setState({password: null});
      this.setState({valpassword: null});
      this.props.history.push(`/register`);
      console.log("valpassword != password");
    }
    else {
      console.log("does it work?");
      //this.props.history.push(`/login`);
      fetch(`${getDomain()}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
        })
      })
        .then(async res=>{
          if (!res.ok) {
            const error = await res.json();
            alert(error.message);
            this.setState({name: null});
            this.setState({username: null});
            this.setState({password: null});
            this.setState({valpassword: null});
            console.log("res not ok!");
            this.props.history.push('/register')
          } else{
            this.props.history.push('/login');
            console.log("res ok!");
          }
        })
        .catch(err => {
          console.log("nope");
          if (err.message.match(/Failed to fetch/)) {
            alert("The server cannot be reached. Did you start it?");
          } else {
            alert(`Something went wrong during the login: ${err.message}`);
          }
        });
    }
  }
// ##################################################################
  return() {
    this.props.history.push("/login");
  }

  // ##################################################################
  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  // ##################################################################
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

  // ############################################################################################################

  render() {
    return (
      <BaseContainer>
        <FormContainer>
          <Form>
            <Label>REGISTER</Label>
            {!this.state.validate ? (
            <p className="PasswordWarningMessage">
              Passwords need to match!
            </p>
          ) :null}

            {this.state.exist ? (
              <p className="UsernameWarningMessage">
                Username taken!
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
