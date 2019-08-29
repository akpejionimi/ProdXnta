import React, { Component } from 'react';
import { connect } from "react-redux"
import { Button, Card, CardBody, Alert, FormFeedback, Spinner,Label, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row }
  from 'reactstrap';
import { Redirect } from "react-router-dom";

import { addOperator, addOperatorInit } from "../../../components/Store/actions/operator"
import { getStaffs } from "../../../components/Store/actions/staff"

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      large: false,
      largeView: false,
      userName: "",
      password: "",
      password2: "",
      operatorLevel: "",
      staffId: "",
      success: false
    }
    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.toggleLargeView = this.toggleLargeView.bind(this);
    this.toggleSuccess = this.toggleSuccess.bind(this);
    this.isLoading = this.isLoading.bind(this)
  }
  componentDidMount() {
    this.props.onGetStaff();


  }


  toggleSuccess() {
    this.setState({
      success: !this.state.success,
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleLarge() {
    this.setState({
      large: !this.state.large,
    });
  }

  toggleLargeView() {
    this.setState({
      largeView: !this.state.largeView,
    });
  }
  onChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

  };

  save = e => {
    e.preventDefault();
    e.target.reset();
    const formData = {
      userName: this.state.userName,
      password: this.state.password,
      operatorLevel: this.state.operatorLevel,
      staffId: this.state.staffId,
    };
    this.props.onAddOperator(JSON.stringify(formData));
    console.log(formData);

  };

  isLoading() {
    return this.props.isLoading || this.props.isLoadStaff
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {this.props.operatorCreated && <Redirect to="/dashboard" />}
                  <Form onSubmit={this.save} action="POST" encType="application/json">
                    {this.props.error && (
                      < Alert color="danger">{this.props.error.msg}</Alert>
                    )}
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Label for="staff"></Label>
                      <select className="form-control"
                        name="staffId"
                        id="staffId"
                        required="required"
                        onChange={this.onChanged}>
                        <option>Select Staff</option>
                        {this.props.staffs.map((staff, index) => {
                          return <option key={index} value={staff.staffId} >
                            {staff.fullName}
                          </option>
                        })}
                      </select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="UserName" autoComplete="username" required="required"
                      name="userName" id="userName" onChange={this.onChanged}/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                    <Label for="operatorLevel"></Label>
                          <Input type="select" name="operatorLevel" id="operatorLevel" required="required"
                            onChange={this.onChanged}>
                            <option value="">Select Operator</option>
                            <option value="inputter">Inputter</option>
                            <option value="authoriser">Authoriser</option>
                            <option value="superAdmin">SuperAdmin</option>
                          </Input>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" required="required"
                      name="password"
                      id="password"
                      onChange={this.onChanged}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" required="required"
                      name="password2"
                      id="password2"
                      // placeholder="Confirm Password"
                      onChange={this.onChanged}
                      invalid={this.state.password !== this.state.password2}
                      autoComplete="new-password" />
                      <FormFeedback>Password doesn't match</FormFeedback>
                    </InputGroup>
                    {this.isLoading() ? (
                      <Spinner color="danger" />
                    ) : (
                        <Button color="success" block>Create Account</Button>
                      )}

                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

}
const mapStateToProps = state => ({
  isLoadingOperator: state.operator.isLoading,
  isLoadStaff: state.staff.isLoading,
  operatorCreated: state.operator.operatorCreated,
  error: state.operator.error,
  staffs: state.staff.staffs,
});

const mapDispatchToProps = dispatch => ({
  onAddOperatorInit: () => dispatch(addOperatorInit()),
  onAddOperator: prodSubData => dispatch(addOperator(prodSubData)),
  onGetStaff: () => dispatch(getStaffs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
