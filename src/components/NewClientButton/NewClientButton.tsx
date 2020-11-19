import { Auth } from "aws-amplify";
import React, { ChangeEvent, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import "./NewClientButton.scss";

/**
 * @function newClientButton
 * This component includes the button for a new client account
 *
 * This also has a modal form that pops up when the button is clicked
 */
export const NewClientButton: React.FC<any> = () => {
  const [modal, setModal] = useState(false);

  /**
   * @function toggle
   *
   * When the create account button is clicked it opens the modal.
   *
   * When clicking anywhere outside of the form on the "x" it hides the modal
   */
  const toggle = () => setModal(!modal);

  /**
   * @function registerUser
   * Collect information and sends it to AWS to get authorized
   *
   * @param event
   * Collecting the information form the form
   *
   * @param error
   * If the user fails to sign up they will get a message letting them know they can not sign up
   *
   */
  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check database if they have the admin role and their current session token matches for security. If not, exit out
    /*
        if (role != "Admin") {
            return null;
        }
        */

    // These need to be up here. Data is dropped when user is checked {for some reason} <= these fields are cleared when the modal unloads
    const email = event.currentTarget["email"].value;
    const password = event.currentTarget["password"].value;
    const role = event.currentTarget["select"].value;

    // Checks cognito if they have the admin role in the current session  for security. If not exit out
    // This checking operation takes about 150 MS
    // Unknown Error - Response time can be 10,000 MS. Usually happens when react is updating. This shouldn't be a problem

    console.log((await Auth.currentSession()).getAccessToken().getJwtToken());
    const checkRole = Auth.currentUserInfo();
    const checker = await checkRole.then(function (result) {
      if (result.attributes["custom:userRole"] !== "admin") {
        return false;
      } else {
        return true;
      }
    });
    //Example
    //Axios.post("/getUsers", data, headers{Authorization:idToken})

    if (!checker) {
      console.log("Error: User does not have permissions to create an account");
      return null;
    }

    setModal(!modal);

    try {
      const signUpResult = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          "custom:userRole": role, // custom role for assigning user to admin or client role
        },
      });

      console.log(
        "Cognito User: " +
          signUpResult.user +
          "\nUserConfirmed: " +
          signUpResult.userConfirmed +
          "\nUserSub: " +
          signUpResult.userSub +
          "\nCode delivery details: " +
          signUpResult.codeDeliveryDetails
      );

      // console.log(signUpResult.user);
      // console.log(signUpResult.codeDeliveryDetails);
    } catch (error) {
      console.log("Couldn't sign up: ", error);
    }
  };

  const [accountType, setAccountType] = useState("client");

  /**
   *
   * @param event
   *
   * this function calls setAccountType which takes in the event element and sets it to accountType.
   */
  const changeForm = (event: ChangeEvent<HTMLInputElement>) =>
    setAccountType(event.target.value);

  return (
    <>
      <Button
        style={{
          backgroundColor: "#F26925",
          fontFamily: " futura-pt, sans-serif",
          fontStyle: "normal",
          fontWeight: 300,
          width: "16rem",
          border: "none",
        }}
        onClick={toggle}
        className={"toggleButton"}
      >
        Create Account
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <Row>
          <Col xs="6">
            <ModalHeader
              className="container"
              style={{
                color: "#F26925",
                display: "flex",
                justifyContent: "space-between",
                marginRight: "50%",
              }}
            >
              Create Account
            </ModalHeader>
          </Col>
          <Col xs="6">
            <Button
              className="close"
              style={{
                backgroundColor: "white",
                color: "#F26925",
                border: "none",
                fontWeight: 800,
                padding: "15px",
              }}
              onClick={toggle}
            >
              X
            </Button>
          </Col>
        </Row>
        <Form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
            registerUser(event)
          }
        >
          <ModalBody>
            <FormGroup>
              <Label for="exampleSelect">Account Type</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="Client Type"
                onChange={changeForm}
              >
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="text" required name="email"></Input>
            </FormGroup>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" required></Input>
            </FormGroup>
            {accountType === "client" ? (
              <FormGroup>
                <Label>Company Name</Label>
                <Input type="text"></Input>
              </FormGroup>
            ) : (
              <></>
            )}
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                required
                minLength={6}
                name="password"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input type="password"></Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              className="newClientButton"
              style={{
                margin: "auto",
                backgroundColor: "#F26925",
                fontFamily: " futura-pt, sans-serif",
                fontStyle: "normal",
                fontWeight: 300,
                width: "100%",
                border: "none",
                fontSize: "1.5rem",
              }}
            >
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};