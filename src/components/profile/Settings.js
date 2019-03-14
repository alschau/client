import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: left;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  width: 100%;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1px;
  margin-bottom: 30px;
`;

// ############################################################################################################
class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      birthday: null,
      exist: false
    };
  }

// ##################################################################
  handleInputChange(key, value) {
    this.setState({[key]: value });
  }

// ##################################################################
  applyUsername() {
      fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
        })
      })
        .then(response => response.json())
        .then( res=>{
          if (res.error) {
            alert(res.message);
            this.setState({username: null});
          } else{
            this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`);
          }
        })
    }

  // ##################################################################
  applyBirthday() {
      fetch(`${getDomain()}/users/${localStorage.getItem("user_id")}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          birthday: this.state.birthday
        })
      })
        .then(response => response.json())
        .then( res=>{
          if (res.error) {
            alert(res.message);
            this.setState({birthday: null});
          } else{
            this.props.history.push(`/profile/${localStorage.getItem("user_id")}/show`);
          }
        })
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
      //let usernameRender;
      return <Container>
        <h2>Change your profile </h2>
        <table
          width="400px"
        >
          <tbody>
          <tr>
            <td>username:</td>
          </tr>
          <InputField
            placeholder="Enter here.."
            onChange={e => {
              this.handleInputChange("username", e.target.value);
            }}
          />
          <ButtonContainer>
            <Button
              disabled={!this.state.username }
              width="60%"
              onClick={() => {
                this.applyUsername();
              }}
            >
              Apply Username
            </Button>
          </ButtonContainer>
          <tr>
            <td>birthday:</td>
          </tr>
          <InputField
            placeholder="dd.MM.yyyy"
            onChange={e => {
              this.handleInputChange("birthday", e.target.value);
            }}
          />
          <ButtonContainer>
            <Button
              disabled={!this.state.birthday}
              width="60%"
              onClick={() => {
                this.applyBirthday();
              }}
            >
              Apply Birthday
            </Button>
          </ButtonContainer>
          </tbody>
        </table>

        <ButtonContainer>
          <Button
            width="100%"
            onClick={() => {
              this.props.history.push(`/game`);
            }}
          >
          Return
          </Button>
        </ButtonContainer>
      </Container>;
    }
}

export default withRouter(Settings);